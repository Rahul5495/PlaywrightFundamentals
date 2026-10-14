
import { test, expect } from "@playwright/test";

test.describe("3 soft assertions & Negation", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/tables/practice.html");
        await expect(page).toHaveURL(/\/tables\/practice#page\/?$/);
        await expect(page).toHaveTitle("QA Profile Form Practice — The Testing Academy");

    });

    test("soft assertions", async ({ page }) => {

        let firstName = page.getByTestId("first-name");

        // Soft : Each line records its own failure. test continue either way. 
        await expect.soft(firstName).toHaveAttribute("id", "first-name");
        await expect.soft(firstName).toBeVisible();
        await expect.soft(firstName).toHaveValue("");

        // Final hard assertion still runs after the soft block.

        await expect(firstName).toBeEnabled();
        // this line will not be executed if the above line is fails
        await page.goto("https://app.thetestingacademy.com/playwright/webtable.html");
        await expect(page.locator("#error")).not.toBeVisible();
        let title= await page.title();
        expect(title).not.toContain("error");

    });

});