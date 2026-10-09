import { chromium } from "playwright-core";
const EXE = process.env.HOME + "/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => m.type() === "error" && console.log("CONSOLE", m.text()));
await page.goto("http://localhost:3999", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.locator("#showreel").evaluate((el) => el.scrollIntoView({ block: "center" }));
await page.waitForTimeout(900);
const info = await page.evaluate(() => {
  const b = document.querySelector("button[aria-label='Putar showreel']");
  if (!b) return { found: false };
  const r = b.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const top = document.elementFromPoint(cx, cy);
  const parentStyles = getComputedStyle(b.parentElement);
  return { found: true, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, topEl: top ? top.tagName + "." + top.className : null, parentPE: parentStyles.pointerEvents, parentClip: parentStyles.clipPath };
});
console.log(JSON.stringify(info, null, 2));
const opened = await page.evaluate(() => {
  document.querySelector("button[aria-label='Putar showreel']").click();
  return document.querySelectorAll("[role=dialog]").length;
});
console.log("dialog after el.click():", opened);
await page.waitForTimeout(600);
console.log("dialog after wait:", await page.locator("[role=dialog]").count());
await browser.close();
