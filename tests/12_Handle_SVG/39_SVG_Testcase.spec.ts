
import { test, expect, Locator } from "@playwright/test";

test.describe("SVG Elements", () => {

    const URL = "https://www.flipkart.com/search";

    test.beforeEach(async ({ page }) => {
        console.log("Before running any Testcase!");
        await page.goto(URL);
        await expect(page).toHaveTitle("Search Store Online - Buy Search Online at Best Price in India | Flipkart.com");
    });

    test("Verify the SVG elements", async ({ page }) => {

        await page.locator("input[name='q']").fill("macmini");
        const svgElements: Locator = page.locator("svg");
        await svgElements.first().click();

        await page.waitForLoadState("networkidle");

        const titleResults: Locator = page.locator("//div[contains(@data-id,'MP') or contains(@data-id,'CPU') or contains(@data-id,'COM') or contains(@data-id,'ACC')]/div/a[2]");
        const count: number = await titleResults.count();

        for (let i = 0; i < count; i++) {
            const title: string | null = await titleResults.nth(i).textContent();
            console.log(title);

        }

        await page.pause();

    });
});