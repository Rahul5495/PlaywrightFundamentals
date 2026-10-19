
import { test, expect } from '@playwright/test';
import { readLoginDataFromDB, isDbConfigured } from './Utils/dbReader';
import type { LoginRow } from './Utils/yamlReader';


test.describe('DDT MySQL', () => {

    test.skip(
        !isDbConfigured(),
        'MySQL is not configured; set MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE in .env'
    );

    let rows: LoginRow[] = [];

    test.beforeAll(async () => {
        rows = await readLoginDataFromDB();
    });

    test('login with every active row from the database', async ({ page }) => {
        expect(rows.length).toBeGreaterThan(0);

        for (const row of rows) {
            await test.step(`Login with : ${row.description}`, async () => {
                await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
                await page.getByRole('textbox', { name: 'Email Address' }).fill(row.username);
                await page.getByRole('textbox', { name: 'Password' }).fill(row.password);
                await page.getByRole('button', { name: 'Login to Practice Account' }).click();
            });
        }
    });

});