
import { test, expect, Locator } from "@playwright/test";

const URL = "https://app.thetestingacademy.com/playwright/widgets/shadow-dom";

test.describe("Shadow DOM Handling", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await expect(page).toHaveTitle("Shadow DOM — The Testing Academy");

    });

    test("locate Shadow DOM and assert visible", async ({ page }) => {

        const card: Locator = page.getByTestId("card-account-card");
        await card.locator("input[name='email']").fill("student@thetestingacademy.com");
        await card.locator("input[name='password']").fill("pw");
        await card.getByTestId("card-account-submit").click();
        await expect(page.getByTestId("card-account-status")).toContainText("student@thetestingacademy.com");

        const cart: Locator = page.getByTestId("counter-cart");
        await cart.getByRole("button", { name: "Increment" }).click();
        await cart.getByRole("button", { name: "Increment" }).click();
        await expect(cart.getByTestId("counter-value")).toHaveText("5");

        await page.getByTestId("card-inside-email").fill("pramod@thetestingacdemy.com");
        await page.getByTestId("card-inside-password").fill("pramod@123");
        await page.getByTestId("card-inside-submit").click();
        await expect(page.getByTestId("card-inside-status")).toContainText("pramod@thetestingacdemy.com");
        await page.pause();

    });

});
