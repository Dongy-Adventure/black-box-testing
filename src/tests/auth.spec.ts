import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ authPage }) => {
  await authPage.goto();
});

test("Registered successfully!", async ({ page, authPage }) => {
  await authPage.goto();
  await authPage.register("JohnDoe", "Test_1234", "John", "Doe", "Test_1234");

  await expect(page).toHaveURL(/\/profile\/edit/);
});

test("Register username less than 3 characters", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.register("ab", "Test_1234", "John", "Doe", "Test_1234");

  const usernameError = page.locator("text=Username is too short");

  await expect(usernameError).toBeVisible();
});

test("Register confirm password wrong", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.register("abcd", "Test_1234", "John", "Doe", "Test_");

  const usernameError = page.locator("text=Passwords don't match");

  await expect(usernameError).toBeVisible();
});
