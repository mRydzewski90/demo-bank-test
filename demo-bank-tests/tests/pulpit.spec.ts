import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userID;
    const UserPassword = loginData.password;
    await page.goto("/");

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(UserPassword);
    await loginPage.loginButton.click();
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const recieverId = "2";
    const transferAmount = "120";
    const transferTitle = "pizza";
    const expectedTransferReciever = "Chuck Demobankowy";
    const expectedMessage = `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiver.selectOption(recieverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.executeButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.expectedMessage).toHaveText(expectedMessage);
  });

  test("check if expected message is displayed when user tries to top up phone with amount of 120 zl", async ({
    page,
  }) => {
    // Arrange
    const topUpReciever = "500 xxx xxx";
    const topUpAmount = "120";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciever}`;

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReceiver.selectOption(topUpReciever);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreement.check();
    await pulpitPage.executePhoneButton.click();
    await pulpitPage.topUpButton.click();

    // Assert
    await expect(pulpitPage.expectedMessage).toHaveText(expectedMessage);
  });

  test("check balanced after correct top-up", async ({ page }) => {
    // Arrange
    const topUpReciever = "500 xxx xxx";
    const topUpAmount = "120";
    const actualBalanced = await page.locator("#money_value").innerText();
    const expectedBalamced = Number(actualBalanced) - Number(topUpAmount);

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReceiver.selectOption(topUpReciever);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreement.check();
    await pulpitPage.executePhoneButton.click();
    await pulpitPage.topUpButton.click();

    // Assert
    await expect(pulpitPage.expectedMoneyValue).toHaveText(
      `${expectedBalamced}`,
    );
  });
});
