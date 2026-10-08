
import { test, expect, Locator } from "@playwright/test";

const URL = 'https://app.thetestingacademy.com/playwright/widgets/svg'; // replace with target page

test.describe("SVG handling", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(URL);
        expect(page).toHaveTitle("SVG Locators — The Testing Academy");
    });

    test("locate SVG root and assert visible", async ({ page }) => {

        let circleShape: Locator = page.locator("#circle-blue");
        await circleShape.click();
        let Output: string = await page.locator("#shapes-output").innerText();
        console.log(Output);
        expect(Output).toContain("Blue circle");

        await page.getByRole("button", { name: /Q3 bar/ }).click();
        await page.getByRole("radio", { name: "4 stars" }).click();

        let allBars: Locator[] = await page.locator(".bar").all();
        for (const bar of allBars) {
            // logic which is the height, low ......click on that.

            const q = await bar.getAttribute("data-quarter");
            const h = await bar.getAttribute("height");
            console.log(q);
            console.log(h);
        }
        await page.pause();

    })
});