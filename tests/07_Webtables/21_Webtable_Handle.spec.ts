
import {test, expect} from "@playwright/test";

// full xpath=//table[@id='customers']/tbody/tr[5]/td[2]/following-sibling::td

test("Verify the Webtable Example 1", async({page})=>{
     await page.goto("https://awesomeqa.com/webtable.html", {waitUntil:"domcontentloaded"});

     //table[@id="customers"]/tbody/tr[5]/td[2]
     // // 5 - i , 1 to 7 ( 1 header) 2 to 7
     // ]/td[
     // 2 - j , j -> 1,2,3
     // ]
     const firstPart= "//table[@id='customers']/tbody/tr[" ;
     const secondPart="]/td[" ;
     const thirdPart="]"  ;

     let rows:number= await page.locator("//table[@id='customers']/tbody/tr").count();
     let columns:number= await page.locator("//table[@id='customers']/tbody/tr[2]/td").count();

     for(let i=2; i<=rows; i++){
        for(let j=1; j<=columns; j++){
            const dynamicPath=`${firstPart}${i}${secondPart}${j}${thirdPart}`;
           // console.log(dynamicPath);
            const data:string[]= await page.locator(dynamicPath).allInnerTexts();
           // console.log(data);

           if(data.includes("Helen Bennett")){
            const countryPath= `${dynamicPath}/following-sibling::td`;
            const countryText= await page.locator(countryPath).innerText();
            console.log("----------------");
            console.log(`Helen Bennett is In - ${countryText}`);
          }
      }
   }
    
});