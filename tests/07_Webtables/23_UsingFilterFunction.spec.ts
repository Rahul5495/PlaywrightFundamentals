
import{test, expect} from "@playwright/test";

test("Verify test case using filter function", async({page})=>{
  
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", 
        {waitUntil:"domcontentloaded"});

    const forgottenPasswordLink = page.locator("a.list-group-item").filter({hasText:"Forgotten Password"});
    await forgottenPasswordLink.click();

    const privacyLink= page.locator("footer a").filter({hasText:"Privacy Policy"});
    await expect(privacyLink).toHaveAttribute("href", "#privacy-policy");
    
    await page.pause();

});