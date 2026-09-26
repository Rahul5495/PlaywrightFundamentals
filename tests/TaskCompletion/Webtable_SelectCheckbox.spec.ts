
import{test, expect} from "@playwright/test";

//table/tbody[@id='employee-body']/tr[3]/td[2]/preceding-sibling::td

test("Search Rohan Mehta and click on the checkbox before his name", async({page})=>{

   await page.goto("https://app.thetestingacademy.com/playwright/webtable", {waitUntil:"domcontentloaded"});

   const firstPart="//table/tbody[@id='employee-body']/tr[";
   const secondPart="]/td[";
   const thirdPart="]";

   const rows= await page.locator("//table/tbody[@id='employee-body']/tr").count();
   const cols= await page.locator("//table/tbody[@id='employee-body']/tr[1]/td").count();

   for(let i=1; i<=rows; i++){
    for(let j=1; j<=cols; j++){

        const dynamicPath= `${firstPart}${i}${secondPart}${j}${thirdPart}`;
       // console.log(dynamicPath);
        const data:string= await page.locator(dynamicPath).innerText();
       // console.log(data);

        if(data.includes("Rohan.Mehta")){
            const checkbox= `${dynamicPath}/preceding-sibling::td`;
            const check=  page.locator(checkbox);
            await check.click();
        }
      }
   }
    await page.pause()
});