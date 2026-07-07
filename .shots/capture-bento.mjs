import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.dirname(new URL(import.meta.url).pathname);
const PAGE_URL = "http://127.0.0.1:3110/";
const PORT = 9335;
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  CHROME,
  [`--remote-debugging-port=${PORT}`, "--headless=new", "--disable-gpu", "about:blank"],
  { stdio: "ignore" }
);

async function waitForChrome() {
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return;
    } catch {}
    await sleep(200);
  }
  throw new Error("Chrome did not start");
}

async function withPage(fn) {
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
  const target = list.find((t) => t.type === "page");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const events = { loaded: false };

  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.method === "Page.loadEventFired") events.loaded = true;
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const mid = ++id;
      pending.set(mid, resolve);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });

  await new Promise((r) => ws.addEventListener("open", r));
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  try {
    return await fn(send, events);
  } finally {
    ws.close();
  }
}

async function capture({ width, height, mobile, outfile }) {
  await withPage(async (send, events) => {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: mobile ? 2 : 1,
      mobile,
    });
    events.loaded = false;
    await send("Page.navigate", { url: PAGE_URL });

    for (let i = 0; i < 40 && !events.loaded; i++) await sleep(250);
    await sleep(3000);

    for (let i = 0; i < 30; i++) {
      const ok = await send("Runtime.evaluate", {
        expression: `!!document.querySelector('#technology .grid')`,
        returnByValue: true,
      });
      if (ok?.result?.value) break;
      await sleep(500);
    }

    await send("Runtime.evaluate", {
      expression: `document.querySelector('#technology .grid')?.scrollIntoView({block:'center'})`,
    });
    await sleep(2000);

    const diag = await send("Runtime.evaluate", {
      expression: `JSON.stringify({cells:document.querySelectorAll('#technology article').length,gridH:document.querySelector('#technology .grid')?.offsetHeight})`,
      returnByValue: true,
    });
    console.log(mobile ? "MOBILE" : "DESKTOP", diag?.result?.value);

    const shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(path.join(OUT_DIR, outfile), Buffer.from(shot.data, "base64"));
  });
}

try {
  await waitForChrome();
  await capture({ width: 1280, height: 1200, mobile: false, outfile: "bento-desktop.png" });
  await capture({ width: 390, height: 844, mobile: true, outfile: "bento-mobile.png" });
  console.log("Done");
} finally {
  chrome.kill("SIGKILL");
}
