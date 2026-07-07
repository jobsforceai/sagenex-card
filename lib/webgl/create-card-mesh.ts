import * as THREE from "three";
import { CARD_ASPECT, CARD_HEIGHT, CARD_TEXTURE_PATH, CARD_WIDTH } from "./card-constants";

const CARD_DEPTH = 0.07;
const CARD_RADIUS = 0.16;

/** Rounded-rectangle shape centered at the origin. */
function roundedRectShape(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

/** Flat rounded face with UVs remapped 0..1 across the bounding box for texturing. */
function roundedFaceGeometry(w: number, h: number, r: number) {
  const geo = new THREE.ShapeGeometry(roundedRectShape(w, h, r), 24);
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const sx = bb.max.x - bb.min.x;
  const sy = bb.max.y - bb.min.y;
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - bb.min.x) / sx;
    uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / sy;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

export function createCardMesh(frontTexture: THREE.Texture) {
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.anisotropy = 8;

  const group = new THREE.Group();

  // Metallic body — extruded rounded rectangle with a soft bevel gives the
  // card real thickness, rounded corners, and a polished metal edge.
  const bodyGeo = new THREE.ExtrudeGeometry(roundedRectShape(CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS), {
    depth: CARD_DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    steps: 1,
    curveSegments: 24,
  });
  bodyGeo.center();
  const body = new THREE.Mesh(
    bodyGeo,
    new THREE.MeshStandardMaterial({
      color: 0x0b0b0b,
      metalness: 0.95,
      roughness: 0.26,
      envMapIntensity: 1.25,
    }),
  );
  group.add(body);

  const faceGeo = roundedFaceGeometry(CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS);
  const faceZ = CARD_DEPTH / 2 + 0.016;

  // Front artwork. Low metalness + dim env reflections keep the matte-black
  // card face reading as a true deep black rather than a washed-out gray.
  const front = new THREE.Mesh(
    faceGeo,
    new THREE.MeshStandardMaterial({
      map: frontTexture,
      metalness: 0.2,
      roughness: 0.58,
      envMapIntensity: 0.3,
    }),
  );
  front.position.z = faceZ;
  group.add(front);

  // Back — procedural texture, mirrored so it reads correctly when flipped.
  const backTexture = createCardBackTexture();
  backTexture.wrapS = THREE.RepeatWrapping;
  backTexture.repeat.x = -1;
  const back = new THREE.Mesh(
    faceGeo,
    new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.5,
      roughness: 0.5,
      envMapIntensity: 0.7,
    }),
  );
  back.rotation.y = Math.PI;
  back.position.z = -faceZ;
  group.add(back);

  return group;
}

export function loadCardTexture() {
  return new Promise<THREE.Texture>((resolve, reject) => {
    new THREE.TextureLoader().load(CARD_TEXTURE_PATH, resolve, undefined, reject);
  });
}

export function createStudioScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f7);
  scene.fog = new THREE.Fog(0xf5f5f7, 12, 22);

  const hemi = new THREE.HemisphereLight(0xffffff, 0xe8e4df, 0.9);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff8f0, 1.35);
  key.position.set(3, 6, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.45);
  fill.position.set(-4, 2, 3);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xc41e3a, 0.35);
  rim.position.set(0, 1, -4);
  scene.add(rim);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(8, 64),
    new THREE.MeshStandardMaterial({
      color: 0xeeedeb,
      metalness: 0.15,
      roughness: 0.82,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.05;
  scene.add(floor);

  return scene;
}

/** Lights only — no background, fog, or floor. For the floating hero card. */
export function createHeroLights(scene: THREE.Scene) {
  // Softer ambient so shadows stay rich and the black face doesn't flatten out.
  const hemi = new THREE.HemisphereLight(0xffffff, 0xe8e4df, 0.55);
  scene.add(hemi);

  // Focused key light gives the gold detailing and metal edge a crisp highlight
  // while leaving the black background dark.
  const key = new THREE.DirectionalLight(0xfff8f0, 1.35);
  key.position.set(3, 6, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.3);
  fill.position.set(-4, 2, 3);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xc41e3a, 0.4);
  rim.position.set(0, 1, -4);
  scene.add(rim);

  // Moving specular glint so the metallic edges catch light as the card turns.
  const glint = new THREE.PointLight(0xffffff, 0.5, 30);
  glint.position.set(0, 2, 6);
  scene.add(glint);
  return glint;
}

/** Draws a studio-clean approximation of the Sagenex card back onto a canvas. */
export function createCardBackTexture(): THREE.Texture {
  const W = 1024;
  const H = Math.round(W / CARD_ASPECT);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    const fallback = new THREE.Texture();
    return fallback;
  }

  const silver = "#d8dde3";
  const silverDim = "#9aa0a8";

  // Matte black body with a soft vertical sheen.
  const body = ctx.createLinearGradient(0, 0, 0, H);
  body.addColorStop(0, "#191919");
  body.addColorStop(0.5, "#0d0d0d");
  body.addColorStop(1, "#050505");
  ctx.fillStyle = body;
  ctx.fillRect(0, 0, W, H);

  // Subtle diagonal light streak.
  const streak = ctx.createLinearGradient(0, 0, W, H);
  streak.addColorStop(0, "rgba(255,255,255,0)");
  streak.addColorStop(0.45, "rgba(255,255,255,0.05)");
  streak.addColorStop(0.55, "rgba(255,255,255,0.02)");
  streak.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = streak;
  ctx.fillRect(0, 0, W, H);

  // Thin inset gold-silver border.
  ctx.strokeStyle = "rgba(200,205,212,0.28)";
  ctx.lineWidth = 2;
  roundRect(ctx, 22, 22, W - 44, H - 44, 26);
  ctx.stroke();

  // Tiny spec code, top-right.
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.font = "500 13px Arial";
  ctx.textAlign = "right";
  ctx.fillText("HB 013699  R025A-HGa", W - 44, 60);
  ctx.textAlign = "left";

  // "AUTHORISED SIGNATURE" label.
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "600 16px Arial";
  ctx.fillText("AUTHORISED SIGNATURE", 70, H * 0.28 - 12);

  // Signature strip with pastel guilloche lines.
  const stripX = 70;
  const stripY = H * 0.28;
  const stripW = W * 0.56;
  const stripH = H * 0.14;
  ctx.fillStyle = "#ece7da";
  ctx.fillRect(stripX, stripY, stripW, stripH);
  const pastel = ["#e9c6c6", "#c6d8e9", "#d9e9c6", "#e9e0c6"];
  ctx.lineWidth = 3;
  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = pastel[i % pastel.length];
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(stripX + 8, stripY + 8 + i * ((stripH - 16) / 9));
    ctx.lineTo(stripX + stripW - 8, stripY + 8 + i * ((stripH - 16) / 9));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // CVV.
  ctx.fillStyle = "#111";
  ctx.font = "600 26px 'Courier New', monospace";
  ctx.textAlign = "right";
  ctx.fillText("934", stripX + stripW - 18, stripY + stripH - 14);
  ctx.textAlign = "left";

  // Card number.
  ctx.fillStyle = silver;
  ctx.font = "600 44px 'Courier New', monospace";
  ctx.fillText("4937 2410 0594 7056", 150, H * 0.62);

  // Simple dove glyph.
  drawDove(ctx, 78, H * 0.6, 62, silver);

  // SAGENEX wordmark.
  const mark = ctx.createLinearGradient(150, 0, 430, 0);
  mark.addColorStop(0, "#f2f4f7");
  mark.addColorStop(0.5, "#b9bfc7");
  mark.addColorStop(1, "#eef1f4");
  ctx.fillStyle = mark;
  ctx.font = "700 58px Georgia, 'Times New Roman', serif";
  ctx.fillText("SAGENEX", 150, H * 0.74);

  // Valid thru.
  ctx.fillStyle = silverDim;
  ctx.font = "500 15px Arial";
  ctx.fillText("VALID", W * 0.6, H * 0.7);
  ctx.fillText("THRU", W * 0.6, H * 0.7 + 18);
  ctx.fillStyle = silver;
  ctx.font = "600 24px Arial";
  ctx.fillText("09/30", W * 0.6 + 66, H * 0.7 + 14);

  // Issuer white box.
  const boxX = 60;
  const boxY = H * 0.82;
  const boxW = W * 0.62;
  const boxH = H * 0.1;
  ctx.fillStyle = "#f4f4f4";
  roundRect(ctx, boxX, boxY, boxW, boxH, 8);
  ctx.fill();
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "600 17px Arial";
  ctx.fillText("This card is issued by Sagenex LLC USA,", boxX + 16, boxY + 34);
  ctx.font = "400 15px Arial";
  ctx.fillText(
    "in pursuant to a license from Visa Worldwide PTE limited",
    boxX + 16,
    boxY + 62,
  );

  // Contactless waves, bottom-right.
  drawContactless(ctx, W - 150, H * 0.86, 46, silver);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawContactless(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string,
) {
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    ctx.lineWidth = 4;
    ctx.globalAlpha = 0.85 - i * 0.18;
    ctx.beginPath();
    ctx.arc(cx, cy, 10 + i * (size / 3), -Math.PI / 4, Math.PI / 4);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawDove(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.92;
  // Body.
  ctx.beginPath();
  ctx.ellipse(size * 0.42, size * 0.1, size * 0.32, size * 0.16, -0.35, 0, Math.PI * 2);
  ctx.fill();
  // Upper wing.
  ctx.beginPath();
  ctx.moveTo(size * 0.2, size * 0.05);
  ctx.quadraticCurveTo(size * 0.0, -size * 0.4, size * 0.55, -size * 0.15);
  ctx.quadraticCurveTo(size * 0.35, size * 0.05, size * 0.2, size * 0.05);
  ctx.fill();
  // Head.
  ctx.beginPath();
  ctx.arc(size * 0.74, size * 0.02, size * 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Tail.
  ctx.beginPath();
  ctx.moveTo(size * 0.12, size * 0.16);
  ctx.lineTo(-size * 0.18, size * 0.28);
  ctx.lineTo(size * 0.16, size * 0.24);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}
