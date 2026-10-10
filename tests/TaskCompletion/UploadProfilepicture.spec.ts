
import { test, expect, Locator } from "@playwright/test";
import path from "path";

const URL = "https://app.thetestingacademy.com/student/my-process";

test.use({
    storageState: './TTALogin-session.json'
});

test.describe("Upload Picture", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
        expect(page).toHaveURL(/my-process/);
        console.log("Student Dashboard loaded — no login needed ✅");
    });

    const upload_dir = path.join("C:", "Images", "Photos", "DSC_7049.JPG");
    test("Upload Profile Picture on TTA", async ({ page }) => {

        await page.getByRole('button', { name: 'Close' }).click();
        await page.getByRole("link", { name: "Settings" }).click();
        await page.locator("#avatar-upload").setInputFiles(upload_dir);
        await page.pause();

    });
});