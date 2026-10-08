
import { test, expect } from "@playwright/test";

function calculateSpentVsEarned(amounts: string[]) {
    let spent = 0;
    let earned = 0;

    for (const amount of amounts) {
        const value = Number(amount.replace("USD", "")
            .replace(/,/g, "")
            .replace(/\s+/g, ""));

        if (value < 0) {
            spent += Math.abs(value);
        } else {
            earned += value;
        }
    }
    return {
        spent,
        earned
    };
};

test("Automate Applitools Website", async ({ page }) => {

    await page.goto("https://demo.applitools.com/");
    await page.getByPlaceholder("Enter your username").fill("Admin");
    await page.getByPlaceholder("Enter your password").fill("Password@123");
    await page.getByRole("link", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/app.html\/?$/);
    await expect(page).toHaveTitle("ACME demo app");

    const amountTexts: string[] = await page.locator("//table//tr/td[5]").allTextContents();
    const results = calculateSpentVsEarned(amountTexts);

    console.log('Total Spent:', results.spent);
    console.log('Total Earned:', results.earned);

    const total = results.earned - results.spent;
    console.log("Net Total: ", total);

    expect(total).toBeCloseTo(1996.22, 2);

    await page.pause()

});
