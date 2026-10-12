
import { test, expect } from "@playwright/test";

const URL = "https://app.thetestingacademy.com/playwright/widgets/scroll";

test.describe("Scroll to Element - TestingAcademy", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await expect(page).toHaveURL(/\/widgets\/scroll\/?$/);
        await expect(page).toHaveTitle("Scroll Practice — The Testing Academy");

    });

    test("scroll to view", async ({ page }) => {

        // 1
        // await page.getByTestId("deep-anchor").scrollIntoViewIfNeeded();
        // await page.getByTestId("deep-anchor").click();

        // 2 - JS execute
        // await page.evaluate(()=>window.scrollTo(0, 1000));
        
        // 3- Jump to bottom
        await page.evaluate(()=> window.scrollTo(0, document.body.scrollHeight));

        // 4- Jump back to  top
        await page.evaluate(()=> window.scrollTo(0, 0));

        await page.pause();

    });

});