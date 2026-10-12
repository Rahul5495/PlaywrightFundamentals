
import { test, expect } from "@playwright/test";

test.describe("Scroll to Element - TestingAcademy", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/widgets/scroll");

    });

    test("Expect", async ({ page }) => {
       
        expect(1+2).toBe(3);
        let ac= false;
        expect(ac).toBeFalsy();
    });

});