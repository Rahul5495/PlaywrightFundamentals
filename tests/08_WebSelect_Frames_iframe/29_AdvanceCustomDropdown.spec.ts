
import { test, expect } from "@playwright/test";

test("Verify AdvanceCustom DropDowns", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/select-boxes");
    await expect(page).toHaveURL(/\/tables\/select-boxes\/?$/);

    // ① Single — searchable
    await page.getByTestId("rs-single-input").click();
    await page.getByText("Selenium", { exact: true }).click();

    // ②  Multi — chips with remove
    await page.getByTestId("rs-multi-input").click();
    await page.getByText("Cucumber", { exact: true }).click();
    await page.getByText("TestNG", { exact: true }).click();
    await page.keyboard.press("Escape");

    // ③ Creatable multi — type and Enter
    await page.locator("#rs-creatable").click();
    await page.getByTestId("rs-creatable-input").fill("api");
    await page.getByText("api-testing", { exact: true }).click();
    await page.getByTestId("rs-creatable-input").fill("per");
    await page.getByText("performance", { exact: true }).click();
    await page.keyboard.press("Escape");

    // ⑤ Async — fetched on type
    await page.locator("#rs-async").click();
    await page.getByTestId("rs-async-input").fill("de");
    await expect(page.getByTestId("rs-async-menu")).toContainText("Delhi");
    await page.getByRole("option", { name: "Delhi" }).click();

    const output = await page.locator("#select-output").allInnerTexts();
    console.log(output);

    await page.pause();

});