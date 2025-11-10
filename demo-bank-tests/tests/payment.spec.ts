import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userID;
    const UserPassword = loginData.password;
    await page.goto("/");
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(UserPassword);
    await page.getByTestId("login-button").click();
    await page.getByRole("link", { name: "płatności" }).click();
  });
  test("simple payment", async ({ page }) => {
    // Arrange
    const transferReceiver = "Jan Kowalski";
    const accNumber = "12 3456 7890 1234 5678 9012 34567";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page.getByTestId("form_account_to").fill(accNumber);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage)
  });
});
