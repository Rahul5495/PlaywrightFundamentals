
import { test, expect, FrameLocator } from "@playwright/test"

test("Verify iframe", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/frames/");
    await expect(page).toHaveURL(/\/playwright\/frames\/?$/);
    await expect(page).toHaveTitle("Frame Handling Practice — The Testing Academy");

    let vehicleFrame: FrameLocator = page.frameLocator("#frame-one");
    await vehicleFrame.getByPlaceholder("e.g. Test Automation", { exact: true }).fill("Creata");
    await vehicleFrame.locator("//input[@name='ownerName']").fill("Kunal Raj");
    await vehicleFrame.getByPlaceholder("MH-12-AB-1234", { exact: true }).fill("MH-20-XY-1141");
    let selectVehicle = vehicleFrame.locator("#RESULT_RadioButton-1");
    await selectVehicle.selectOption("Sedan");
    await vehicleFrame.locator("#RESULT_TextField-4").fill("2023");

    await vehicleFrame.locator("#RESULT_TextArea-1").fill("Amazing car for small family and car in a budget");
    await vehicleFrame.getByRole("button", { name: "Submit registration" }).click();

    let submittedOutput = vehicleFrame.locator("#vehicle-output").allInnerTexts();
    console.log(submittedOutput);

    await page.pause();

});