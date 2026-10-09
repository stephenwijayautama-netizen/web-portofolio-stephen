import { chromium } from "playwright-core";
const EXE = process.env.HOME + "/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("response", (r) => { if (r.status() >= 400) console.log("HTTP", r.status(), r.url()); });
await page.goto("http://localhost:3999", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
console.log("reduced motion:", await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches));
await page.locator("#showreel").evaluate((el) => el.scrollIntoView({ block: "center" }));
await page.waitForTimeout(1500);
console.log(await page.evaluate(() => {
  const poster = document.querySelector("#showreel .panel");
  const b = document.querySelector("button[aria-label='Putar showreel']");
  const cs = getComputedStyle(poster);
  const r = b.getBoundingClientRect();
  return { clip: cs.clipPath, anim: cs.animationName, posterRect: poster.getBoundingClientRect().toJSON(), btnRect: {x:r.x,y:r.y,w:r.width,h:r.height}, styleAttr: poster.getAttribute("style") };
}));
await browser.close();
