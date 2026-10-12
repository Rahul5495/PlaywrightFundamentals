
import { test, expect } from "@playwright/test";

const URL = "https://app.thetestingacademy.com/playwright/widgets/scroll";

test.describe("Scroll to Element - TestingAcademy", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL, { waitUntil: "domcontentloaded" });
        await expect(page).toHaveURL(/\/widgets\/scroll\/?$/);
        await expect(page).toHaveTitle("Scroll Practice — The Testing Academy");

    });

    test("Lazy scroll to view", async ({ page }) => {

        // 5- lazy list grows past 10 once visible
        await page.getByTestId("section-lazy").scrollIntoViewIfNeeded();
        await page.getByTestId("lazy-list").scrollIntoViewIfNeeded();
        const list = page.getByTestId("lazy-list").locator("li");

        // wait for the first load to land (two batches of 5) before reading the count:
        // read too early, initialCount is 0 and the poll below passes without any scroll.

        await expect(list).toHaveCount(10);
        const intialCount = await list.count();

        // the next batch loads when the loader comes back into view. At 1920x1080 the
        // whole list already fits, so scrolling to the last item alone loads nothing.

        await page.evaluate(() => window.scrollTo(0, 0));
        await page.getByTestId("lazy-loader").scrollIntoViewIfNeeded();

        expect.poll(async () => list.count(), {
            message: "expected_itmes > 10",
            timeout: 10_000
        }).toBeGreaterThan(intialCount);

        const finalCount = await list.count();
        console.log(finalCount);

        await page.waitForTimeout(5000);

    });

});

