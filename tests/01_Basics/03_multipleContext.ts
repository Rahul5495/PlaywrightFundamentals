
import { chromium } from "playwright";

async function multiUserTest() {
    let browser = await chromium.launch({headless:false});
    //admin

    let adminContext= await browser.newContext();
    let adminPage= await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    console.log("Admin: on login page");

    //viewer
    let viwerContext= await browser.newContext();
    let viewerPage= await viwerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer: on login page");

   await adminContext.close();
   await viwerContext.close();
   await browser.close();
   
}

   multiUserTest();