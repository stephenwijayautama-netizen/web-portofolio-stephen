import { chromium } from "playwright-core";
const EXE = process.env.HOME + "/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const res = await page.evaluate(() => {
  const img = document.querySelector("img[alt='Avatar Stephen']");
  if (!img) return "not found";
  return {
    src: img.src,
    w: img.width,
    h: img.height,
    clientWidth: img.clientWidth,
    clientHeight: img.clientHeight,
    display: getComputedStyle(img).display,
    opacity: getComputedStyle(img).opacity,
    visibility: getComputedStyle(img).visibility,
    parentW: img.parentElement.clientWidth,
    parentH: img.parentElement.clientHeight
  };
});
console.log(JSON.stringify(res, null, 2));
await page.screenshot({ path: "/tmp/shot-avatar.png", fullPage: false });
await browser.close();
