

import { test, expect, type Page } from "@playwright/test";

async function pagination(page: Page): Promise<void> {
    const nextButton = page.locator('span:has-text("NEXT")');

    while (true) {
        const itemNames = await page.locator(".RG5S1k").allInnerTexts();
        const itemPrice = await page.locator(".OEPId .hZ3P6w.DeU9vY").allInnerTexts();

        for (const name of itemNames) {
            console.log(name);
        }

        for (const price of itemPrice) {
            console.log(price);
        }

        const isNextVisible = await nextButton.isVisible().catch(() => false);

        if (!isNextVisible) {
            break;
        }

        await nextButton.click();
        await page.locator('.RG5S1k').first().waitFor({state:"visible"});
    }
}

test('Flipkart Webtable navigation and print the name and price', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');
    await page.locator("//span[@role='button']").click();

    const searchBar = page.getByRole('textbox', {
        name: 'Search for products, brands and more',
    });

    await searchBar.fill('DSLR camera');
    await searchBar.press('Enter');

    await expect(page).toHaveURL(
        'https://www.flipkart.com/search?q=DSLR%20camera&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=off&as=off'
    );

    await expect(page.locator("//div[@class='lvJbLV col-12-12']").first()).toBeVisible();

    await pagination(page);

    await page.pause();
});
