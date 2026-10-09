
import { test, expect } from "@playwright/test";
import path from 'path';

const URL = "https://www.patternfly.org/components/file-upload/multiple-file-upload/";

test.describe("Multiple File Upload", () => {
    test.beforeEach(async ({ page }) => {

        await page.goto(URL, { waitUntil: "domcontentloaded" });
        expect(page).toHaveTitle("PatternFly • Multiple file upload");

    });
    test("upload multiple files from disk", async ({ page }) => {

        // Real files living next to this spec, instead of in-memory buffers.
        // __dirname is this file's folder, so the paths work no matter where
        // the runner is started from.

        const file1 = path.join(__dirname, "file1.jpg");
        const file2 = path.join(__dirname, "file2.jpg");

        await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles([file1, file2]);

        const uploadArea = page.locator("div.pf-v6-c-multiple-file-upload");
        await expect(uploadArea).toContainText("file1.jpg");
        await expect(uploadArea).toContainText("file2.jpg");

        await page.pause();

    });

});