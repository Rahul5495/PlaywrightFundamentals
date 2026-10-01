
import { test, expect } from "@playwright/test";

test("Verify OrangeHRM to add employee", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "domcontentloaded" });

    // User login to OrangeHRM
    await page.getByPlaceholder("Username", { exact: true }).fill("admin");
    await page.getByPlaceholder("Password", { exact: true }).fill("admin123");
    await page.getByRole("button", { name: " Login " }).click();

    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

    await page.locator("//a[contains(@href, 'viewPimModule')]").click();
    await expect(page).toHaveURL(/pim/);
    await page.getByRole("button", { name: " Add " }).click();
    await expect(page.getByRole("heading", { name: "Add Employee" })).toBeVisible();

    await page.getByPlaceholder("First Name").fill("Mr.title");
    await page.getByPlaceholder("Middle Name").fill("Mi");
    await page.getByPlaceholder("Last Name").fill("Smith");
    await page.locator("//input[@class='oxd-input oxd-input--active']").nth(1).fill("222234");
    await page.getByRole("button", { name: " Save " }).click();

    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);

    await page.locator("//a[contains(@href, 'viewPimModule')]").click();
    await expect(page).toHaveURL(/pim\/viewEmployeeList/);

    const employeeID = page.locator("//input[@class='oxd-input oxd-input--active']").nth(1);
    await employeeID.fill("222234");
    await page.getByRole("button", { name: " Search " }).click();

    const employeeRow = page.getByRole('row').filter({ hasText: "Mr.title" }).filter({ hasText: "Smith" });
    await expect(employeeRow).toBeVisible();

    await page.locator("//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']").nth(1).click();
    await page.getByRole("button", { name: " Delete Selected " }).click();
    await expect(page.getByText("Are you Sure?")).toBeVisible();
    await page.getByRole("button", { name: " Yes, Delete " }).click();
    await expect(page.getByText('Successfully Deleted')).toBeVisible();

    // Search again to ensure the employee no longer exists
    await employeeID.fill("222234");
    await page.getByRole("button", { name: " Search " }).click();
    await expect(employeeRow).not.toBeVisible();

    await page.pause();

});