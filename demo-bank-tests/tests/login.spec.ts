import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("User login to DemoBank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = loginData.userID;
    const userPassword = loginData.password;
    const expectedUserName = "Jan Demobankowy";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.locator("#user_name")).toHaveText(expectedUserName);
  });

  test("successful login with too short username", async ({ page }) => {
    // Arrange
    const incorrectUserId = "Mateus";
    const expectedErrorLoginMessage = "identyfikator ma min. 8 znaków";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorLoginMessage);
  });

  test("successful login with too short password", async ({ page }) => {
    // Arrange
    const userId = loginData.userID;
    const userPassword = "Mateu";
    const expectedErrorPasswordMessage = "hasło ma min. 8 znaków";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(
      expectedErrorPasswordMessage,
    );
  });
});
