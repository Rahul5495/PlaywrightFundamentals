
import { test, expect } from "@playwright/test";
import path from "path";

const URL = "https://app.thetestingacademy.com/playwright/widgets/upload-download"; // replace with target page

test.describe("FileUpload handling", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await expect(page).toHaveTitle("Upload & Download Practice — The Testing Academy");
    });

    test("locate FileUpload and upload", async ({ page }) => {
        // File upload
        // Path of the file. - You should. A
        const filePath = path.join(__dirname, "TestData.txt");
        console.log(filePath);

        // __dirname - Current working directory full path 

        await page.getByTestId("single-upload").setInputFiles(filePath);
        await expect(page.getByTestId("single-preview")).toContainText("TestData.txt");
        await page.pause();

    });

});