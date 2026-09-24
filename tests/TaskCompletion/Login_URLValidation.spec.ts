
import{test, expect} from "@playwright/test";

test("Task: Invalid Login & URL Validation", async({page})=>{

     await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", 
        {timeout: 15000, waitUntil:"domcontentloaded"});
     await page.locator("#email").fill("abcd@gmail.com"); 
     await page.locator("#password").fill("abcd@1234");

     await page.locator("//input[@type='checkbox']").click();
     let button= await page.locator("//button[@type='submit']").isVisible();
     console.log(button);
     await page.locator("//button[@type='submit']").click();
     
     await expect(page).toHaveURL("https://app.thetestingacademy.com/playwright/multiple_element_filter");
     await page.pause();

});