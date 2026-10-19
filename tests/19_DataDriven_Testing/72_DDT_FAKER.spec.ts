
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


const users = faker.helpers.multiple(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 12 }),
}), { count: 5 });

test.describe('DDT Faker', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    });

    for (const user of users) {

        test(`Login with : ${user.name}`, async ({ page }) => {
            const email = page.getByRole('textbox', { name: 'Email Address' });
            const password = page.getByRole('textbox', { name: 'Password' });

            await email.fill(user.email);
            await password.fill(user.password);
            await expect(email).toHaveValue(user.email);

            await page.getByRole('button', { name: 'Login to Practice Account' }).click();
        });

    }

});