import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";

test.describe("Pulpit tests", () => {
  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const demoBankUrl = "https://demo-bank.vercel.app/";
    const userId = "Mateusz1";
    const UserPassword = "Mateusz1";

    const recieverId = "2";
    const transferAmount = "120";
    const transferTitle = "pizza";
    const expectedTransferReciever = "Chuck Demobankowy";

    // Act
    await page.goto(demoBankUrl);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(UserPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(recieverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test("check if expected message is displayed when user tries to top up phone with amount of 120 zl", async ({
    page,
  }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.locator("#login_id").fill("Mateusz1");
    await page.locator("#login_password").fill("Mateusz1");
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("120");
    await page.locator("#widget_1_topup_agreement").check();
    await page.getByTestId("execute_phone_btn").click;
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Doładowanie wykonane! 120,00PLN na numer 500 xxx xxx",
    );
  });
});
