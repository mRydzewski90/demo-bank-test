import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = "Mateusz1";
    const UserPassword = "Mateusz1";
    await page.goto("/");
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(UserPassword);
    await page.getByTestId("login-button").click();
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
});
