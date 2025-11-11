import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

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
    await page.locator("#widget_1_transfer_receiver").selectOption(recieverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });

  test("check if expected message is displayed when user tries to top up phone with amount of 120 zl", async ({
    page,
  }) => {
    // Arrange
    const topUpReciever = "500 xxx xxx";
    const topUpAmount = "120";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciever}`;

    // Act
    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciever);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#widget_1_topup_agreement").check();
    await page.getByTestId("execute_phone_btn").click;
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });

  test("check balanced after correct top-up", async ({ page }) => {
    // Arrange
    const topUpReciever = "500 xxx xxx";
    const topUpAmount = "120";
    const actualBalanced = await page.locator("#money_value").innerText();
    const expectedBalamced = Number(actualBalanced) - Number(topUpAmount);

    // Act
    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciever);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#widget_1_topup_agreement").check();
    await page.getByTestId("execute_phone_btn").click;
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    // Assert
    await expect(page.locator("#money_value")).toHaveText(
      `${expectedBalamced}`,
    );
  });
});
