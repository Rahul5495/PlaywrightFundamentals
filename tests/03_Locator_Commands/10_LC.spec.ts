
import{test, expect} from "@playwright/test";

test("Verify X", async({page})=>{
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", {waitUntil:"commit"});
     const response= await page.goto("https://app.thetestingacademy.com/login", 
        {waitUntil:"domcontentloaded", timeout: 45000, referer:"https://thetestingacademy.com"

        });

});     