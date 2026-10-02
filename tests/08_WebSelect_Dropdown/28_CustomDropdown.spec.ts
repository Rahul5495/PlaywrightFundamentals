
import { test, expect } from "@playwright/test";

test("Verify Custom DropDowns", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns");
    await expect(page).toHaveURL(/\/tables\/dropdowns\/?$/);
    await page.getByTestId("lang-trigger").click();
    await page.getByRole("option", { name: "JavaScript" }).click();

    await page.locator("#framework-trigger").click();
    await page.getByText("Angular", { exact: true }).click();

    await page.getByTestId("experience-trigger").click();
    await page.getByText("Mid-level (4-6 years)", { exact: true }).click();

    await page.getByRole("button", {name: "Save selection"}).click();
    const output= await page.locator("#dropdown-output").allInnerTexts();
    console.log(output);
    
    await page.pause();

});