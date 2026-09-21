
import {test, expect, Page, BrowserContext} from "@playwright/test";

test("context with options", async({browser})=>{
        const context= await browser.newContext({
            viewport: {width:1234, height: 870},
            locale: "fr-FR",
            timezoneId: "Europe/Paris",
            geolocation:{latitude:48.8556, longitude:2.3522},
            permissions:["geolocation"],
        });
          let page:Page= await context.newPage();
          await page.goto("https://app.vwo.com/#login");
          await page.close();
          await context.close();
          await browser.close();
});

test("Mobile context", async({browser})=>{
    const iPhone= {
        viewport:{width: 375, height:667 },
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
        deviceScaleFactor: 2,
        isMobile:true,
        hasTouch: true,
    }
   const context:BrowserContext= await browser.newContext(iPhone);
           const page:Page= await context.newPage();
           await page.goto("https://app.vwo.com/#login");
           await page.close();
           await context.close();
           await browser.close();
});