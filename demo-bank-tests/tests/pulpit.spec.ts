import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('Mateusz1');
        await page.getByTestId('password-input').fill('Mateusz1');
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').fill('zwrot');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByText('Przelew wykonany!Odbiorca:').click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('xpath=//div[2]/label/a/span')).toHaveText('Przelew wykonany! Chuck Demobankowy - 120,00PLN - zwrot');
    });


    test('check if expected message is displayed when user tries to top up phone with amount of 120 zl', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.locator('#login_id').fill('Mateusz1');
        await page.locator('#login_password').fill('Mateusz1');
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('120');
        await page.locator('#widget_1_topup_agreement').check();
        await page.getByTestId('execute_phone_btn').click;
        await page.getByRole('button', { name: 'doładuj telefon' }).click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 120,00PLN na numer 500 xxx xxx');

    });

});