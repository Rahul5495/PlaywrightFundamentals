
import { test, expect } from "@playwright/test"

test("Fill and submit QA profile form on TTA", async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/practice#page");
    await expect(page).toHaveURL(/\/playwright\/tables\/practice#page/);
    await expect(page).toHaveTitle("QA Profile Form Practice — The Testing Academy");
    
    // Personal information
    await page.getByTestId("first-name").fill("Rohan");
    await page.getByTestId("last-name").fill("Khanna");
    await page.getByTestId("gender-male").click();
    
    // Professional details
    let selectExperince = page.locator("#years-experience");
    let options: string[] = await selectExperince.allTextContents();
    await selectExperince.click();
    for (const option of options) {
        console.log(option);
        if (option.includes("4")) {
            await selectExperince.selectOption({ index: 4 });
        }
    }
    await page.locator("#profile-date").fill("2022-10-02");
    await page.getByTestId("profession-automation").click();

    // Technical Skills
    await page.getByTestId("tool-uft").click();
    await page.getByTestId("tool-selenium").click();
    await page.getByTestId("continent-asia").click();
    await page.getByTestId("tab-webelement").click();
    
    // Submission
    await page.getByRole("button", { name: "Save profile" }).click();
    const submissionOutput: string[] = await page.locator("#submission-output").allInnerTexts();
    console.log(submissionOutput);

    await page.waitForTimeout(5000);
});