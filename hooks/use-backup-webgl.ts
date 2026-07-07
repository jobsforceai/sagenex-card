"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BACKUP_STEPS } from "@/lib/content";
import { createCardMesh, createStudioScene, loadCardTexture } from "@/lib/webgl/create-card-mesh";

const STEP_THRESHOLDS = [0.34, 0.67];

type CardPose = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  opacity: number;
};

function getScrollProgress(track: HTMLElement, container: HTMLElement) {
  const trackRect = track.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const scrollable = trackRect.height - containerRect.height;
  if (scrollable <= 0) return 0;
  return Math.max(0, Math.min(1, (containerRect.top - trackRect.top) / scrollable));
}

function stepFromProgress(progress: number) {
  for (let i = 0; i < STEP_THRESHOLDS.length; i++) {
    if (progress < STEP_THRESHOLDS[i]) return i;
  }
  return BACKUP_STEPS.length - 1;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpPose(a: CardPose, b: CardPose, t: number): CardPose {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t),
    rx: lerp(a.rx, b.rx, t),
    ry: lerp(a.ry, b.ry, t),
    rz: lerp(a.rz, b.rz, t),
    opacity: lerp(a.opacity, b.opacity, t),
  };
}

/** Card-onboarding story — card reveals as the user progresses signup → KYC → delivery */
function getCardPose(progress: number): CardPose {
  const hidden: CardPose = { x: 0, y: 0.4, z: -1.2, rx: -0.6, ry: 0.3, rz: 0.1, opacity: 0 };
  const signup: CardPose = { x: 0.3, y: 0.35, z: -0.6, rx: -0.45, ry: -0.5, rz: 0.08, opacity: 0.25 };
  const kyc: CardPose = { x: 0.15, y: 0.3, z: -0.2, rx: -0.35, ry: -0.25, rz: 0.04, opacity: 0.6 };
  const delivered: CardPose = { x: 0, y: 0.26, z: 0.1, rx: -0.28, ry: 0.1, rz: 0, opacity: 1 };

  if (progress < 0.22) {
    return lerpPose(hidden, signup, smoothstep(0, 0.22, progress));
  }
  if (progress < 0.56) {
    return lerpPose(signup, kyc, smoothstep(0.22, 0.56, progress));
  }
  return lerpPose(kyc, delivered, smoothstep(0.56, 1, progress));
}

export function useBackupWebgl(
  trackRef: React.RefObject<HTMLElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
  stageRef: React.RefObject<HTMLElement | null>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [ready, setReady] = useState(false);
  const trackRefStable = useRef(trackRef);
  const containerRefStable = useRef(containerRef);
  trackRefStable.current = trackRef;
  containerRefStable.current = containerRef;

  const scrollToStep = (step: number) => {
    const track = trackRefStable.current.current;
    const container = containerRefStable.current.current;
    if (!track) return;
    const progress = step === 0 ? 0.05 : step === 1 ? 0.5 : 0.92;
    const containerH = container?.offsetHeight ?? window.innerHeight;
    const scrollable = track.offsetHeight - containerH;
    const top = track.offsetTop + progress * scrollable;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!track || !container || !stage || !canvas) return;

    let cancelled = false;
    let frameId = 0;
    let targetProgress = 0;
    let smoothProgress = 0;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = createStudioScene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0.45, 8.1);
    camera.lookAt(0, 0.18, 0);

    let card: THREE.Group | null = null;

    const resize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const applyPose = (target: THREE.Group, pose: CardPose) => {
      target.position.set(pose.x, pose.y, pose.z);
      target.rotation.set(pose.rx, pose.ry, pose.rz);
      target.visible = pose.opacity > 0.02;

      const fading = pose.opacity < 0.999;
      target.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            // Only go transparent while fading in/out — opaque cards keep
            // depth writes so overlapping cards don't flicker (sorting).
            m.transparent = fading;
            m.depthWrite = !fading;
            m.opacity = pose.opacity;
          });
        }
      });
    };

    const tick = () => {
      frameId = requestAnimationFrame(tick);

      targetProgress = getScrollProgress(track, container);
      smoothProgress += (targetProgress - smoothProgress) * 0.09;

      const step = stepFromProgress(smoothProgress);
      setActiveStep((prev) => (prev === step ? prev : step));

      if (card) {
        const pose = getCardPose(smoothProgress);
        // Subtle idle sway so the card feels alive between scroll positions.
        pose.ry += Math.sin(performance.now() * 0.0006) * 0.05;
        applyPose(card, pose);
      }

      const breathe = Math.sin(performance.now() * 0.001) * 0.015;
      camera.position.y = 0.45 + breathe;
      camera.position.x = Math.sin(performance.now() * 0.0004) * 0.08;
      // Re-aim every frame so the idle sway can't tilt the framing and crop
      // the card's top/bottom edges out of the stage.
      camera.lookAt(0, 0.18, 0);

      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(stage);

    loadCardTexture()
      .then((texture) => {
        if (cancelled) return;
        card = createCardMesh(texture);
        scene.add(card);
        resize();
        setReady(true);
        tick();
      })
      .catch(() => {
        setReady(true);
        tick();
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
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
  }, [trackRef, containerRef, stageRef]);

  return { canvasRef, activeStep, ready, scrollToStep };
}
