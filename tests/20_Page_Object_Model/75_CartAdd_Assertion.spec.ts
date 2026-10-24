
import { test, expect } from "@playwright/test";
import { LoginPage } from "./Pages/LoginPage";
import { Inventorypage } from "./Pages/InventoryPage";
import { Cartpage } from "./Pages/CartPage";

test("add first item to cart and verify it in the cart", async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new Inventorypage(page);
    const cartPage = new Cartpage(page);
    let itemName = "";

    await test.step("open the login page", async () => {

        await loginPage.goto();
    });

    await test.step("login as standard_user", async () => {

        await loginPage.login("standard_user", "tta_secret");
        await expect(inventoryPage.title).toHaveText("Products");
    });

    await test.step("add the first item to the cart", async () => {

        itemName = await inventoryPage.addFirstItemToCart();
    });

    await test.step("open the cart", async () => {

        await inventoryPage.openCart();
        await expect(cartPage.title).toHaveText("Your Cart");
    });

    await test.step("verify the item is in the cart", async () => {

        await expect(cartPage.itemName).toHaveText(itemName);
        await expect(cartPage.itemPrice).toHaveText("$15.99");
        await expect(cartPage.checkout).toBeVisible();

    });

})