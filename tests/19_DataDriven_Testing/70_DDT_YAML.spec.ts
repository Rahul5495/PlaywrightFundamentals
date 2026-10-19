import { test, expect } from '@playwright/test';
import path from 'path';
import { readYAML, type LoginRow } from './Utils/yamlReader';

/**
 * Data-driven login, same page as 286, but the rows come from YAML.
 *
 * This is the closest match to 286. readYAML is synchronous, so the data is
 * available at test-collection time and each row becomes its own test(),
 * with its own entry in the report and its own retry.
 *
 * Compare with 287 (Excel) and 289 (MySQL), where the reader is async and the
 * rows have to be replayed as test.step()s inside one test instead.
 */
const YAML_PATH = path.join(__dirname, 'test-data', 'login-data.yaml');
const APP_URL = 'https://app.thetestingacademy.com/playwright/multiple_element_filter';

// Read at module load, before any test runs.
const loginData = readYAML<LoginRow>(YAML_PATH);

test.describe('DDT YAML', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(APP_URL);
    });

    test.afterEach(async ({ }, testInfo) => {
        console.log(`afterEach: ${testInfo.title} - status: ${testInfo.status}`);
    });

    for (const data of loginData) {

        test(`Login with : ${data.description}`, async ({ page }) => {

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

            // YAML gives a real boolean, no "true"/"false" string parsing needed.
            expect(typeof data.shouldPass).toBe('boolean');
            console.log(`  ${data.description} -> shouldPass=${data.shouldPass}`);
        });

    }

});