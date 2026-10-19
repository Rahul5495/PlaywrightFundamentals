
import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
const TTA_USER = process.env.TTA_USER;
const TTA_PASS = process.env.TTA_PASS;

const URL = "https://app.thetestingacademy.com/playwright/multiple_element_filter";

test.describe("Practice Assertions", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await expect(page).toHaveURL(/multiple_element_filter/);
        await expect(page).toHaveTitle("Multiple Element Filter Login — The Testing Academy");
    });

    test("Validate Multi Assertions", async ({ page }) => {

        let textBox = page.getByRole("textbox", { name: "Email" });
        await expect(textBox).toBeEnabled();
        await expect(textBox).toBeEmpty();
        await expect(textBox).toBeEditable();
        await expect.soft(textBox).toHaveAttribute("id", "email");
        await textBox.fill(TTA_USER);

        let passWord = page.getByRole("textbox", { name: "Password" });
        await expect(passWord).toBeEnabled();
        await expect(passWord).toBeEmpty();
        await expect(passWord).toBeEditable();
        await expect.soft(passWord).toHaveAttribute("id", "password");
        await passWord.fill(TTA_PASS);

        let checkBox = page.getByRole("checkbox", { name: "remember" });
        await expect(checkBox).toBeVisible();
        await expect(checkBox).toBeEnabled();
        await checkBox.check();
        await expect(checkBox).toBeChecked();

        let button = page.getByTestId("login-button");
        await expect(button).toBeEnabled();
        await expect(button).toBeVisible();
        await button.click();

        const listGroupItems = page.locator("a.list-group-item");
        await expect(listGroupItems).toHaveCount(13);
        const list = await listGroupItems.allInnerTexts();
        console.log(list);
        expect(list).toContain("Recurring Payments");

        await page.pause();

    });

});