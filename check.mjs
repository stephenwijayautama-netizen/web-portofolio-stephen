import { chromium } from "playwright-core";

const EXE =
  process.env.HOME +
  "/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const errors = [];
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => m.type() === "error" && errors.push("console: " + m.text()));
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto("http://localhost:3999", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);

const lv1 = await page.locator("header").first().innerText();
const title = await page.locator("h1").innerText();
const bubble = await page.locator("h1 ~ p").first().innerText().catch(() => "");

// avatar click
const avatar = page.locator("svg.h-full").first();
const before = await page.locator("p.min-h-\\[2\\.6rem\\]").innerText();
await avatar.click({ force: true });
await page.waitForTimeout(400);
const after = await page.locator("p.min-h-\\[2\\.6rem\\]").innerText();

// lightbox
await page.locator("#showreel").evaluate((el) => el.scrollIntoView({ block: "center" }));
await page.waitForTimeout(1600);
await page.locator("button[aria-label='Putar showreel']").click({ force: true });
await page.waitForTimeout(600);
const dialogOpen = await page.locator("[role=dialog]").isVisible();
const focusIn = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
await page.keyboard.press("Escape");
await page.waitForTimeout(1400);
const dialogClosed = (await page.locator("[role=dialog]").count()) === 0;

// skills tooltip
await page.locator("#skills").evaluate((el) => el.scrollIntoView({ block: "center" }));
await page.waitForTimeout(900);
await page.locator("div[aria-label^='Laravel']").hover({ force: true });
await page.waitForTimeout(400);
const tooltip = await page.locator("text=SKILL TREE").count();

// scroll to bottom -> level
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);
const lvEnd = await page.locator("header").first().innerText();

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/shot-hero.png" });
await page.screenshot({ path: "/tmp/shot-full.png", fullPage: true });

// mobile
const mob = await browser.newPage({ viewport: { width: 360, height: 740 }, hasTouch: true, isMobile: true });
mob.on("pageerror", (e) => errors.push("mobile pageerror: " + e.message));
await mob.goto("http://localhost:3999", { waitUntil: "networkidle" });
await mob.waitForTimeout(2600);
await mob.screenshot({ path: "/tmp/shot-mobile.png", fullPage: true });
const hscroll = await mob.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);

console.log(
  JSON.stringify(
    {
      errors,
      hudTop: lv1.replace(/\n/g, " | "),
      title: title.replace(/\n/g, ""),
      bubbleChanged: before !== after,
      dialogOpen,
      focusIn,
      dialogClosed,
      achievementToast: tooltip > 0,
      hudEnd: lvEnd.replace(/\n/g, " | "),
      mobileHScroll: hscroll,
    },
    null,
    2
  )
);

await browser.close();
