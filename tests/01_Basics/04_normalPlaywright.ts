
import { chromium, Browser, BrowserContext, Page } from "playwright";

async function run() {
       let browser:Browser= await chromium.launch({headless:false});
       let context:BrowserContext= await browser.newContext();
       let page= await context.newPage();
       await page.goto("https://example.com");
       console.log("Title: ", await page.title());
    
       //cleanup- reverse order
      await page.close();
      await context.close();
      await browser.close();
}