
import { test, expect } from "@playwright/test";

test("Verify Hover for the spicejet", async ({ page }) => {

    await page.goto("https://www.spicejet.com/");
    await page.getByText("Add-ons", { exact: true }).hover();
    let fly = page.getByText("FlyEarly", { exact: true });
    await fly.click();
    await expect(fly).toHaveText("FlyEarly");

    await page.pause();
});