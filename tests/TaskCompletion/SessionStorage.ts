import { chromium } from "playwright";
import dotenv from "dotenv";

dotenv.config();
// Credentials live in .env (gitignored) — never hardcode them in a public repo.
const TTA_USER= process.env.TTA_USER;
const TTA_PASS= process.env.TTA_PASS;


async function saveSession() {
      let browser= await chromium.launch({headless: false});
      let context= await browser.newContext();
      let page=    await context.newPage();

      await page.goto("https://app.thetestingacademy.com/login");
      await page.fill("#identifier-field", TTA_USER);
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page.fill("#password-field", TTA_PASS);
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page.waitForURL(/\/student\/my-process\/?$/, {timeout:15000});
      await page.pause();
      await context.storageState({path: "./TTALogin-session.json"});
      console.log("Session saved to user-session.json ✅");
        
      await browser.close();
   
}
  saveSession();