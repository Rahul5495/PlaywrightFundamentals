
import { test, expect, FrameLocator, Locator } from "@playwright/test";

test("Verify multiple frame", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/frames/multi-frames");
    await expect(page).toHaveURL(/\/frames\/multi-frames\/?$/);
    await expect(page).toHaveTitle("Multi-frame practice — The Testing Academy");

    let mainFrame: FrameLocator = page.frameLocator("[name='main']");
    const headerText: string = await mainFrame.locator("#main-heading").innerText();
    console.log(headerText);

    let allFrame: Locator[] = await page.locator("//frame").all();
    console.log("total number of frames: " + allFrame.length);

    for (const frames of allFrame) {
        console.log(await frames.getAttribute("name"), ": ", frames.getAttribute("src"));
    }

    let sideFrame: FrameLocator = page.frameLocator("[name='side']");
    let registrationLink= sideFrame.getByTestId("side-link-registration");
    await registrationLink.click();
    await expect(registrationLink).toHaveText("Vehicle registration");
    await page.waitForTimeout(3000);

});