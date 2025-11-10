
import { test, expect } from '@playwright/test';
import credentials from '../resources/credentials.json';


test.describe('User login to DemoBank', () => {

 test('successful login with correct credentials', async ({ page }) => {
  const password = credentials.password
  await page.goto(`${credentials.baseUrl}`);
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
});

 test('successful login with too short username', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('tester');
  await page.getByTestId('password-input').click();


  await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');

});

test('successful login with too short password', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('password-input').fill('1234');
  await page.getByTestId('password-input').blur();

  await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');

});

});