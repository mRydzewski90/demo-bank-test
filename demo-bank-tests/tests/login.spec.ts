import { test, expect } from "@playwright/test";

test.describe("User login to DemoBank", () => {
  
  test.beforeEach(async ({ page }) => {
    const demoBankUrl = "https://demo-bank.vercel.app/";
    await page.goto(demoBankUrl);
  });

  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = "Mateusz1";
    const UserPassword = "Mateusz1";
    const expectedUserName = "Jan Demobankowy";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(UserPassword);
    await page.getByTestId("login-button").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("successful login with too short username", async ({ page }) => {
    // Arrange
    const userId = "Mateus";
    const expectedErrorLoginMessage = "identyfikator ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").click();

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorLoginMessage,
    );
  });

  test("successful login with too short password", async ({ page }) => {
    // Arrange
    const userId = "Mateusz1";
    const UserPassword = "Mateu";
    const expectedErrorPasswordMessage = "hasło ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(UserPassword);
    await page.getByTestId("password-input").blur();

    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorPasswordMessage,
    );
  });
});
