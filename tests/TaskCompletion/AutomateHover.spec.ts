
import { test, expect } from "@playwright/test";

test("perform mouse over", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/hover-menu");
    await expect(page).toHaveURL(/\/hover-menu\/?$/);
    await expect(page).toHaveTitle("Hover Menu Practice — The Testing Academy");

    await page.locator("//div[@data-testid='nav-add-ons']").hover();
    await page.getByRole("menuitem", { name: "Wi-Fi" }).click();
    await page.keyboard.press("Escape");

    const output = await page.locator("#output").innerText();
    console.log("Output is: " + output);

    const jasonOutput = JSON.parse(output);
    console.log(jasonOutput);
    expect(jasonOutput.clicked).toContain("Wi-Fi");

    await page.pause();

});