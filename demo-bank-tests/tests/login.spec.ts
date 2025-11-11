import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("User login to DemoBank", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });

  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = loginData.userID;
    const userPassword = loginData.password;
    const expectedUserName = "Jan Demobankowy";

    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userName).toHaveText(expectedUserName);
  });

  test("successful login with too short username", async ({ page }) => {
    // Arrange
    const incorrectUserId = "Mateus";
    const expectedErrorLoginMessage = "identyfikator ma min. 8 znaków";

    // Act
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
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(
      expectedErrorPasswordMessage,
    );
  });
});
