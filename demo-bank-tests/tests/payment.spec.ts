import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userID;
    const userPassword = loginData.password;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenuComponent.paymentButton.click();
  });
  test("simple payment", async ({ page }) => {
    // Arrange
    const transferReceiver = "Jan Kowalski";
    const accNumber = "12 3456 7890 1234 5678 9012 34567";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferAccountInput.fill(accNumber);
    await paymentPage.transferAmountInput.fill(transferAmount);
    await paymentPage.executeTransferButton.click();
    await paymentPage.closeButton.click();

    //Assert
    await expect(paymentPage.expectedMessage).toHaveText(expectedMessage);
  });
});
