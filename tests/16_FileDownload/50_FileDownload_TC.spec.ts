
import { test, expect } from "@playwright/test";

const URL = "https://app.thetestingacademy.com/playwright/widgets/upload-download";

test.describe("File Download Demo", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await expect(page).toHaveTitle("Upload & Download Practice — The Testing Academy");

    });

    test("Demo: Download setInputFiles", async ({ page }) => {

        const [staticDownload] = await Promise.all([
            page.waitForEvent("download"),
            page.getByTestId("download-static").click()
        ]);

        await staticDownload.saveAs("./out/" + staticDownload.suggestedFilename());
        await page.pause();
    });

});
