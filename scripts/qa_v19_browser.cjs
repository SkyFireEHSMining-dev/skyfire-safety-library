/* v0.19 browser proof: simulated screen/engine behavior. NOT physical iPhone/iPad acceptance. */
const { chromium, webkit } = require("playwright");
const root = "http://127.0.0.1:8765/" + (process.env.SKYFIRE_TEST_ROOT || "");
const screens = [
  { name: "phone", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { name: "tablet", viewport: { width: 820, height: 1180 }, isMobile: true, hasTouch: true },
  { name: "desktop", viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false }
];
(async () => {
  for (const [engineName, engine] of [["Chromium", chromium], ["WebKit", webkit]]) {
    const browser = await engine.launch({ headless: true, args: engineName === "Chromium" ? ["--no-sandbox"] : [] });
    try {
      for (const screen of screens) {
        const ctx = await browser.newContext({
          viewport: screen.viewport, isMobile: screen.isMobile, hasTouch: screen.hasTouch,
          serviceWorkers: "allow", acceptDownloads: true
        });
        try {
          const page = await ctx.newPage(), errors = [];
          page.on("pageerror", error => errors.push(error.message));
          const start = await page.goto(root, { waitUntil: "domcontentloaded", timeout: 50000 });
          if (!start || !start.ok()) throw Error("Home load failure");
          await page.locator("h1").first().waitFor({ state: "visible", timeout: 25000 });
          if ((await page.title()) !== "SkyFire Safety") throw Error("Page title did not reflect new name");
          if ((await page.locator(".main-header h1").innerText()).trim() !== "SkyFire Safety") throw Error("Header name incorrect");
          const manifest = await page.evaluate(async () => (await (await fetch("manifest.json")).json()));
          if (manifest.name !== "SkyFire Safety") throw Error("Manifest branding incorrect");

          await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
          await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
            .filter({ hasText: "MSHA Forms Library" }).first().click();
          await page.locator("#docsSection").waitFor({ state: "visible", timeout: 15000 });
          const num = await page.locator('#docsSection .document-actions a[target="_blank"][href$=".pdf"]').count();
          if (num !== 14) throw Error("Expected 14 open links: " + num);

          for (const form of ["5000-23", "7000-1"]) {
            const open = page.locator('#docsSection a[href="docs/MSHA-form-' + form + '.pdf"][target="_blank"]');
            await open.scrollIntoViewIfNeeded();
            const before = await page.evaluate(() => scrollY), tabsBefore = ctx.pages().length;
            await open.click();
            const dialog = page.locator("#skyfirePdfPreview");
            await dialog.waitFor({ state: "visible", timeout: 12000 });
            if (!(await page.locator("#sfPdfReturn").isVisible())) throw Error("No return action");
            const src = await page.locator("#sfPdfFrame").getAttribute("src");
            if (!src || !src.endsWith("/docs/MSHA-form-" + form + ".pdf")) throw Error("PDF iframe source incorrect " + src);
            if (ctx.pages().length !== tabsBefore) throw Error("Unexpected new tab opening");
            const fallbacks = await page.locator('#sfPdfExternal[href$=".pdf"], #sfPdfDownload[download][href$=".pdf"]').count();
            if (fallbacks !== 2) throw Error("Original/Download fallback missing");
            await page.locator("#sfPdfReturn").click();
            if (await dialog.isVisible()) throw Error("Return did not dismiss dialog");
            if (!(await page.locator("#docsSection").isVisible())) throw Error("Lost Forms Library");
            const after = await page.evaluate(() => scrollY);
            if (Math.abs(before - after) > 8) throw Error("Scroll position lost " + before + " → " + after);
            console.log("PASS", engineName, screen.name, "PDF return", form);
          }

          // Existing PWA content must install and survive a genuine offline reload.
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(async () => {
            const hit = await caches.match("./docs/MSHA-form-5000-23.pdf");
            const js = await caches.match("./pdf-preview-v19.js", { ignoreSearch: true });
            return Boolean(hit && hit.ok && js && js.ok);
          }, null, { timeout: 65000 });
          await page.reload({ waitUntil: "domcontentloaded", timeout: 35000 });
          await ctx.setOffline(true);
          if (engineName === "Chromium") {
            await page.reload({ waitUntil: "domcontentloaded", timeout: 35000 });
          } else {
            // Playwright's Linux WebKit 26 headless runtime failed with an internal
            // error on offline page.reload in initial run 44968950815, even after
            // online PDF return and normal SW install passed. Exercise offline
            // cached PDF fetch in this controlled page without falsely claiming a
            // WebKit cold-reload PASS; physical iPhone/iPad acceptance remains open.
            console.log("LIMITATION WebKit headless offline cold reload not validated; physical-device test required");
          }
          await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
          await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
            .filter({ hasText: "MSHA Forms Library" }).first().click();
          await page.locator('#docsSection a[href="docs/MSHA-form-5000-23.pdf"][target="_blank"]').click();
          await page.locator("#skyfirePdfPreview").waitFor({ state: "visible", timeout: 16000 });
          const response = await page.evaluate(async () => {
            const r = await fetch("docs/MSHA-form-5000-23.pdf");
            const first = new TextDecoder().decode((await r.arrayBuffer()).slice(0, 4));
            return { status: r.status, first };
          });
          if (response.status !== 200 || response.first !== "%PDF") throw Error("Cached PDF inaccessible offline: " + JSON.stringify(response));
          await page.locator("#sfPdfReturn").click();
          if (!(await page.locator("#docsSection").isVisible())) throw Error("Lost app offline");
          if (errors.length) throw Error("Page JS errors: " + errors.slice(0, 5).join(" | "));
          console.log("PASS", engineName, screen.name, engineName === "Chromium" ?
            "offline cold PWA reload, cached PDF and return" :
            "offline cached PDF and return in existing controlled page (cold reload unverified)");
        } finally {
          await ctx.close();
        }
      }
    } finally {
      await browser.close();
    }
  }
})().catch(error => { console.error("FAIL v0.19 browser:", error.stack || error); process.exit(1); });
