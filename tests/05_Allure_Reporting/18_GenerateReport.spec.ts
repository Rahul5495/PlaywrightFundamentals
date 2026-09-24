
import {test, expect  } from "@playwright/test";

test("TC01_Start Free Trial", async({page})=>{
   await page.goto("https://app.wingify.com/#/login", 
    {referer:"https://app.wingify.com", waitUntil:"domcontentloaded"});
   await expect(page).toHaveTitle("Login - Wingify");

   let newpage= page.getByRole("link",{name:"Start a FREE TRIAL", exact:true});
   await newpage.click();
   let content=await newpage.textContent();
   expect(content?.trim()).toBe("Start a FREE TRIAL");
   await page.pause();
});