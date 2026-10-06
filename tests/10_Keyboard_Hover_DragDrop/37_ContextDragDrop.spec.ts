
import { test, expect } from "@playwright/test"

test("Verify Drag and Drop", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/context-menu");
    await expect(page).toHaveURL(/\/widgets\/context-menu\/?$/);
    await expect(page).toHaveTitle("Right-click Context Menu — The Testing Academy");

    await page.locator("span.context-menu-one").first().click({ button: "right" });

    const allOptions: string[] = await page.locator("ul.context-menu-list span").allInnerTexts();
    console.log(allOptions);

    await page.getByText("Copy", { exact: true }).first().click();
    await page.pause();

});