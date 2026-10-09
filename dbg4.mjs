import { chromium } from "playwright-core";
const EXE = process.env.HOME + "/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => console.log("LOG:", m.text()));
await page.goto("http://localhost:3999", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.evaluate(() => {
  const el = document.querySelector("#showreel .panel");
  const io = new IntersectionObserver((es) => es.forEach(e => console.log("IO ratio", e.intersectionRatio, "isIntersecting", e.isIntersecting)), { threshold: [0, 0.35, 1] });
  io.observe(el);
  window.addEventListener("scroll", () => console.log("scroll fired"), { once: true });
});
await page.locator("#showreel").evaluate((el) => el.scrollIntoView({ block: "center" }));
await page.waitForTimeout(1200);
// try forcing whileInView by dispatching
const res = await page.evaluate(async () => {
  const el = document.querySelector("#showreel .panel");
  return { rect: el.getBoundingClientRect().toJSON(), html: el.getAttribute("style") };
});
console.log(JSON.stringify(res));
await browser.close();
