
import { test, expect } from "@playwright/test"

test.describe("Different Javascript Alerts", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts", { waitUntil: "domcontentloaded" });
    });

    test("JS Alert accept 1", async ({ page }) => {
        // test.setTimeout(60000);
        await page.getByRole("button", { name: "Click for JS Alert" }).click();

        page.once("dialog", async dialog => {
            console.log("Alert type: ", dialog.type());
            console.log("Alert message: ", dialog.message());
            expect(dialog.message()).toBe("I am a JS Alert");
            await dialog.accept();

        });
        await page.waitForTimeout(5000);
        await page.close();
    });

    test("JS Alert accept 2", async ({ page }) => {
        page.once("dialog", async dialog => {
            console.log("Alert type: ", dialog.type());
            expect(dialog.type()).toBe('confirm');
            console.log('alert message: ', dialog.message());
            expect(dialog.message()).toBe('I am a JS Confirm');
            // await dialog.accept();
            await dialog.dismiss();

        });

        await page.locator('button', { hasText: "Click for JS Confirm" }).click();
        await expect(page.locator('#result')).toHaveText("You clicked: Ok");
        await page.waitForTimeout(5000);
        await page.close();
    });

    test("JS Alert accept 3", async ({ page }) => {

        const inputText = "Hello from The Testing Academy";

        page.once("dialog", async dialog => {
            expect(dialog.type()).toBe("prompt");
            expect(dialog.defaultValue()).toBe("");
            await dialog.accept(inputText);
        });
        await page.locator("button", { hasText: "Click for JS Prompt" }).click();
        expect(page.locator("#result")).toHaveText(`You entered: ${inputText}`);

    });

});
