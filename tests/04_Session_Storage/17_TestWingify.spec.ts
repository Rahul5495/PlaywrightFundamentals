
import{test, expect} from "@playwright/test";

// Load the saved session

test.use({
    storageState: './user-session.json'
});

test("go directly to dashboard — Test1", async({page})=>{
   await page.goto("https://app.wingify.com/#/dashboard?accountId=1281316");
   await expect(page).toHaveURL(/dashboard/);
   console.log("Dashboard loaded — no login needed ✅");
   await page.waitForTimeout(3000);

});

test("go directly to dashboard2 — Test2", async({page})=>{
   await page.goto("https://app.wingify.com/#/dashboard?accountId=1281316");
   await expect(page).toHaveURL(/dashboard/);
   console.log("Dashboard2 loaded — no login needed ✅");
   await page.waitForTimeout(3000);
});
