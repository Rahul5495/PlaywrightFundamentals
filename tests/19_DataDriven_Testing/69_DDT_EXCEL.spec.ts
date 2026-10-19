
import { test, expect } from '@playwright/test';
import path from 'path';
import { readLoginDataFromExcel } from './Utils/excelReader';
import type { LoginRow } from './Utils/yamlReader';

/**
 * Data-driven login, same page as 286, but the rows come from an .xlsx.
 *
 * Regenerate the spreadsheet with:
 *   node tests/19_Data_Driven_Testing/util/generateExcel.js
 *
 * WHY THIS LOOKS DIFFERENT FROM 286 AND 288
 * -----------------------------------------
 * exceljs is asynchronous, and Playwright collects tests *synchronously*.
 * There is no way to `await` at module level and still produce one test()
 * per row, so the rows are loaded in beforeAll and replayed as test.step()s
 * inside a single test. Each step still shows up separately in the report.
 *
 * If you need one real test() per row from an async source, pre-generate a
 * JSON file in globalSetup and import that synchronously instead.
 */

const XLSX_PATH = path.join(__dirname, 'test-data', 'login-data.xlsx');
const APP_URL = 'https://app.thetestingacademy.com/playwright/multiple_element_filter';

test.describe('DDT Excel', () => {

    let rows: LoginRow[] = [];

    test.beforeAll(async () => {
        rows = await readLoginDataFromExcel(XLSX_PATH);
        console.log(`Loaded ${rows.length} rows from ${path.basename(XLSX_PATH)}`);
    });

    test.afterEach(async ({ }, testInfo) => {
        console.log(`afterEach: ${testInfo.title} - status: ${testInfo.status}`);
    });

    test('login with every row from the spreadsheet', async ({ page }) => {
        expect(rows.length, 'no rows were read from the spreadsheet').toBeGreaterThan(0);

        for (const data of rows) {
            await test.step(`Login with : ${data.description}`, async () => {
                await page.goto(APP_URL);

                const textboxEmailAddress = page.getByRole("textbox", { name: "Email Address" });
                const textboxPassword = page.getByRole("textbox", { name: "Password" })
                    .or(page.locator("#password"))
                    .or(page.locator("[name=\"password\"]"));
                const buttonLogin = page.getByRole("button", { name: "Login to Practice Account" })
                    .or(page.getByTestId("login-button"))
                    .or(page.getByText("Login to Practice Account"));

                await textboxEmailAddress.fill(data.username);
                await textboxPassword.fill(data.password);
                await buttonLogin.click();

                console.log(`  ${data.description} -> shouldPass=${data.shouldPass}`);
            });
        }
    });

});