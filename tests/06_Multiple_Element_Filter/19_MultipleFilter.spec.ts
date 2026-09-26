
import{test, expect} from "@playwright/test";

test("Basic verify how to handle multiple elements", async({page})=>{

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    let allTexts: string[]= await page.locator("a.list-group-item").allInnerTexts();
    console.log(allTexts.length);

    for(const link of allTexts){
        console.log(link);
        }
    
    for(const linktest of allTexts){  
        if(linktest==="Forgotten Password"){
          await page.getByText(linktest).first().click();
        }
    }

    const alltexts= await page.locator("a.list-group-item").all();
      for (const link of alltexts){
        console.log(await link.getAttribute("href"));
  }
    await page.pause();
});