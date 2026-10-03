
import { test, expect, FrameLocator } from "@playwright/test";

test("Verify Nested Frames", async ({ page }) => {
    await page.goto("https://selectorshub.com/iframe-scenario/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/iframe-scenario\/?$/);
    await expect(page).toHaveTitle("Automation Challenge - SelectorsHub");

    const frame1: FrameLocator = page.frameLocator("#pact1").nth(0);
    const frame2: FrameLocator = frame1.frameLocator("#pact2").nth(0);
    const frame3: FrameLocator = frame2.frameLocator("#pact3").nth(0);

    await frame1.locator("#inp_val").fill("Aishwarya Rai");
    await frame2.locator("#jex").fill("Wife");
    await frame3.locator("#glaf").fill("Playwright");

    await expect(frame1.locator("#inp_val")).toHaveValue("Aishwarya Rai");
    await expect(frame2.locator("#jex")).toHaveValue("Wife");
    await expect(frame3.locator("#glaf")).toHaveValue("Playwright");

    const headerText = await frame1.locator('h3').innerText();
    console.log(headerText);
    await page.waitForTimeout(5000);
    
});