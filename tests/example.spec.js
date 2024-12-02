// @ts-check
const { test, expect } = require("@playwright/test");
const { email, password, invalidEmail, invalidPassword } = require("../user");

test("testValid", async ({ page }) => {
  test.setTimeout(80000);
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();

  await expect(
    page.locator("[data-testid='profile-programs-content']")
  ).toContainText("Моё обучение");
});

test("testInvalidData", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(invalidEmail);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(invalidPassword);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("[data-testid='login-error-hint']")).toContainText(
    "Вы ввели неправильно логин или пароль."
  );
});
