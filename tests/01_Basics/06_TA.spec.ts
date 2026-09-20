
import{test, expect, BrowserContext, Page} from '@playwright/test';

test("Navigating to the tta website", async({page})=>{
      await page.goto("https://app.thetestingacademy.com/playwright/");
    
});

test("BCP - in app.vwo.com two roles", async({browser})=>{
      let adminContext:BrowserContext= await browser.newContext();
      let userContext:BrowserContext= await browser.newContext();
      let guestContext:BrowserContext= await browser.newContext();

      let adminPage:Page= await adminContext.newPage();
      await adminPage.goto("https://app.thetestingacademy.com/playwright/");
                   
      let userPage:Page= await userContext.newPage();
      await userPage.goto("https://sdet.live");

      let guestPage:Page= await guestContext.newPage();
      await guestPage.goto("https://scrolltest.com");

      await adminPage.close();
      await userPage.close();
      await guestPage.close();

});