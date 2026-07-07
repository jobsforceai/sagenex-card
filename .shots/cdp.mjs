import fs from "fs";

const PORT = process.argv[2] || "9334";
const URL = process.argv[3];
const W = +(process.argv[4] || 390);
const H = +(process.argv[5] || 780);
const SCROLL = +(process.argv[6] || 0);
const OUT = process.argv[7] || "shot.png";
const DSF = +(process.argv[8] || 1);
const MOBILE = process.argv[9] === "mobile";

const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
const loaded = new Promise((resolve) => {
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
    if (msg.method === "Page.loadEventFired") resolve();
  });
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await new Promise((r) => ws.addEventListener("open", r));
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: DSF, mobile: MOBILE });
await send("Page.navigate", { url: URL });
await loaded;
await sleep(3800);
const evalJs = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true })).result?.value;
if (SCROLL > 0) {
  let done = 0;
  while (done < SCROLL) {
    const d = Math.min(240, SCROLL - done);
    await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: Math.round(W / 2), y: Math.round(H / 2), deltaX: 0, deltaY: d });
    done += d;
    await sleep(70);
  }
  await sleep(1800);
}
const diag = await evalJs(`(()=>{const s=document.getElementById('hero');const r=s.getBoundingClientRect();const total=r.height-window.innerHeight;const p=total>0?Math.max(0,Math.min(1,-r.top/total)):0;const de=document.documentElement;return JSON.stringify({vw:window.innerWidth,innerH:window.innerHeight,scrollY:Math.round(window.scrollY),progress:+p.toFixed(2),overflow:Math.round(de.scrollWidth-window.innerWidth)});})()`);
console.log("DIAG", diag);
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
fs.writeFileSync(OUT, Buffer.from(shot.data, "base64"));
console.log("WROTE", OUT);
ws.close();
process.exit(0);
