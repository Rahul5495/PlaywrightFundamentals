
import { test, expect, Locator } from "@playwright/test";

const URL = "https://selectorshub.com/xpath-practice-page/";

test.describe("Handle Shadow DOM", () => {

    test.beforeEach(async ({ page }) => {
       await page.goto(URL, {waitUntil: "domcontentloaded"});
       await expect(page).toHaveTitle("Xpath Practice Page | Shadow dom, nested shadow dom, iframe, nested iframe and more complex automation scenarios.");
       await expect(page).toHaveURL(/\/xpath-practice-page\/?$/);
    });
     
    test("Handle Shadow DOM-SelectorHub", async({page})=>{
         
        const shadowDOM:Locator = page.locator("#userName");
        await shadowDOM.locator("#kils").fill("Username");
        await shadowDOM.locator("#pizza").fill("Farmhouse");
        
        //Move to closed shadow DOM
        await page.keyboard.press("Tab");
        await page.keyboard.type("Concept Test Practice");
        
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.type("2346456")
        await page.pause();
    });

});