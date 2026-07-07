"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createCardMesh, createHeroLights, loadCardTexture } from "@/lib/webgl/create-card-mesh";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const REVEAL_THRESHOLDS = [0.44, 0.6, 0.76, 0.9];

/**
 * Cinematic hero:
 *  - on load the card flies up, unrotates and scales into place (time-based intro)
 *  - as you scroll it glides from center to the side and holds in a 3/4 pose
 *  - crossing thresholds reports a "reveal" count so DOM feature callouts appear
 */
export function useHeroCardScene(
  sectionRef: React.RefObject<HTMLElement | null>,
  onReveal?: (count: number) => void,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    let cancelled = false;
    let frameId = 0;
    let smoothProgress = 0;
    let introStart = 0;
    let lastReveal = -1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const glint = createHeroLights(scene);

    // Neutral studio environment → believable metallic reflections.
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.1, 6.2);
    camera.lookAt(0, 0, 0);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    let card: THREE.Group | null = null;

    loadCardTexture()
      .then((texture) => {
        if (cancelled) return;
        card = createCardMesh(texture);
        scene.add(card);
        resize();
        introStart = performance.now();
        setReady(true);
      })
      .catch(() => setReady(true));

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return 0;
      return clamp01(-rect.top / total);
    };

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      const now = performance.now();
      const t = now * 0.001;

      smoothProgress += (readProgress() - smoothProgress) * 0.09;

      if (card) {
        const aspect = camera.aspect;
        // At rest the card sits LOW and compact so the headline/subtext above it
        // stay clear; as you scroll it glides aside and rises into the feature stage.
        const move = smoothstep(0.05, 0.4, smoothProgress);
        const sideX = aspect > 1.1 ? -1.55 : 0;
        // Responsive base size so the card never overruns narrow viewports.
        const baseScale = Math.min(0.72, 0.92 * aspect);

        // Scroll target pose (what the card eases toward at the current scroll).
        const targetX = lerp(0, sideX, move);
        const targetY = lerp(-0.22, 0.05, move) + Math.sin(t * 0.7) * 0.03;
        const targetRotY = lerp(0, 0.42, move) + pointer.x * 0.14 + Math.sin(t * 0.5) * 0.03;
        const targetRotX = lerp(-0.06, -0.12, move) + pointer.y * 0.06;
        const targetScale = baseScale * lerp(1, 1.12, move);

        // Time-based intro blended over the scroll pose.
        const intro = easeOutCubic(clamp01((now - introStart) / 1300));
        const sx = lerp(0.55, targetX, intro);
        const sy = lerp(targetY - 1.5, targetY, intro);
        const sz = lerp(-2.2, 0, intro);
        const rY = lerp(-1.1, targetRotY, intro);
        const rX = lerp(0.5, targetRotX, intro);
        const rZ = lerp(0.15, 0, intro);
        const scl = lerp(baseScale * 0.7, targetScale, intro);

        card.position.set(sx, sy, sz);
        card.rotation.set(rX, rY, rZ);
        card.scale.setScalar(scl);

        card.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => {
              m.transparent = intro < 1;
              m.opacity = intro;
            });
          }
        });
      }

      glint.position.x = Math.sin(t * 0.6) * 4;

      // Report reveal count for DOM callouts (only when it changes).
      let reveal = 0;
      for (const th of REVEAL_THRESHOLDS) if (smoothProgress >= th) reveal++;
      if (reveal !== lastReveal) {
        lastReveal = reveal;
        onRevealRef.current?.(reveal);
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      pmrem.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    };
  }, [sectionRef]);

  return { canvasRef, ready };
}
