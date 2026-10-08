
import { test, expect, Locator } from "@playwright/test";

const sampleMaps = "https://simplemaps.com/svg/country/in";

test.describe("SVG handling", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(sampleMaps);
        await expect(page).toHaveTitle("Free Blank India Map in SVG | Simplemaps.com");

    });

    test("locate SVG root and assert visible", async ({ page }) => {

        const states: Locator[] = await page.locator("path").all();
        for (const state of states) {
            const classState = await state.getAttribute("class");
            console.log(classState);
            if (classState?.includes("INMP")) {
                await state.click();
            }
        }
        await page.pause();

    });
});