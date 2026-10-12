
import { test, expect } from "@playwright/test";

const URL = "https://app.thetestingacademy.com/playwright/widgets/scroll";

test.describe("Scroll to Element - TestingAcademy", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await expect(page).toHaveURL(/\/widgets\/scroll\/?$/);
        await expect(page).toHaveTitle("Scroll Practice — The Testing Academy");

    });

    test("scroll to view using abort", async ({ page }) => {
        // 5) lazy list grows past 10 once visible

        await page.getByTestId('section-lazy').scrollIntoViewIfNeeded();
        await page.getByTestId('lazy-list').scrollIntoViewIfNeeded();

        const list = page.getByTestId('lazy-list').locator('li');
        const initialCount = await list.count();

        // scroll the LAST existing item into view — item 11 does not exist yet,
        // so nth(10) would just wait until the test times out.

        const controller = new AbortController();
        // setTimeout(() => controller.abort(), 500);

        await list.last().scrollIntoViewIfNeeded({ signal: controller.signal });

        expect.poll(async () => list.count(), {

            message: "expected_item > 10",
            timeout: 10_000

        }).toBeGreaterThan(initialCount);

        const finalCount = await list.count();
        console.log(finalCount);

        await page.waitForTimeout(5000);

    });

    test("Rahul: cancel the wait with an AbortSignal (v1.62+)", async ({ page }) => {
          
        await page.setContent('<button style="display:none">Hidden</button>');
         const controller= new AbortController();
         setTimeout(() => controller.abort(), 500);  
         await expect(page.locator('button').scrollIntoViewIfNeeded({signal: controller.signal})).rejects.toThrow("Aborted");
         
    });

});
