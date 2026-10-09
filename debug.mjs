import { chromium } from "playwright-core";

const EXE =
  process.env.HOME +
  "/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("response", (r) => r.status() >= 400 && console.log("HTTP", r.status(), r.url()));
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));

await page.goto("http://localhost:3999", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.locator("#showreel").evaluate((el) => el.scrollIntoView({ block: "center" }));
await page.waitForTimeout(900);
const btn = page.locator("button[aria-label='Putar showreel']");
console.log("box", await btn.boundingBox());
await btn.click({ force: true });
await page.waitForTimeout(800);
console.log("dialog count after force click:", await page.locator("[role=dialog]").count());
await btn.click();
await page.waitForTimeout(800);
console.log("dialog count after normal click:", await page.locator("[role=dialog]").count());
await browser.close();
