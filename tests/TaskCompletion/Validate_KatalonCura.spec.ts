
import { test, expect, chromium} from "@playwright/test";

test("TC_Verify katalon cura make appointment page", async () => {
     let browser= await chromium.launch({headless:false});
     let context= await browser.newContext();
     let page= await context.newPage();

     await page.goto("https://katalon-demo-cura.herokuapp.com/", { waitUntil: "domcontentloaded" });
     await page.getByRole("link", { name: "Make Appointment", exact: true }).click();
     await page.locator("#txt-username").fill("John Doe");
     await page.locator("#txt-password").fill("ThisIsNotAPassword");
     await page.getByRole("button", { name: "Login" }).click();
     
     let verifyMessage= page.getByRole("heading", { name: "Make Appointment", exact: true })
     await expect(verifyMessage).toHaveText("Make Appointment");

});
