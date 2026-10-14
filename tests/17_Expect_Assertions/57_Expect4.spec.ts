
import { test, expect } from "@playwright/test";

test.describe("Visabled-enabled-disabled-checked", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/tables/practice.html");
        await expect(page).toHaveURL(/\/tables\/practice#page\/?$/);
        await expect(page).toHaveTitle("QA Profile Form Practice — The Testing Academy");

    });

    test("Visible · enabled · disabled · checked", async ({ page }) => {

        const automationCheckbox = page.getByRole("checkbox", { name: "UFT" });
        await automationCheckbox.check();
        await expect(automationCheckbox).toBeChecked();

        const submitButton = page.getByTestId("profile-submit");
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();

        await expect(page).toHaveTitle(/QA Profile/);
        const appUrl = page.url();
        expect(appUrl).toContain('thetestingacademy');

        await page.pause()

    });

});
