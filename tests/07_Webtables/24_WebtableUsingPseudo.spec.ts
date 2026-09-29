
import{test, expect} from "@playwright/test";

test("Verify TestCase-Locate webelement using pseudo class", async({page})=>{
     
   await page.goto("https://app.thetestingacademy.com/playwright/webtable", {waitUntil:"domcontentloaded"});
   //await page.locator("//td[text()='Rohan.Mehta']/preceding-sibling::td/input").click();

   await page.locator("tr:has(td:text('Rohan.Mehta'))").locator("input").first().click();

   await page.waitForTimeout(5000);
   
});