import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ authPage }) => {
  await authPage.goto();
});

test("Registered buyer succeed!", async ({ page, authPage }) => {
  await authPage.goto();
  await authPage.register(
    "JohnDoe",
    "Test_1234",
    "John",
    "Doe",
    "Test_1234",
    0
  );

  await expect(page).toHaveURL(/\/profile\/edit/);
});

test("Registered seller succeed!", async ({ page, authPage }) => {
  await authPage.goto();
  await authPage.register(
    "JaneDoe",
    "Test_1234",
    "Jane",
    "Doe",
    "Test_1234",
    1
  );

  await expect(page).toHaveURL(/\/profile\/edit/);
});

test("Register username less than 3 characters", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.register("ab", "Test_1234", "John", "Doe", "Test_1234", 0);

  const usernameError = page.locator("text=Username is too short");

  await expect(usernameError).toBeVisible();
});

test("Register confirm password wrong", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.register("abcd", "Test_1234", "John", "Doe", "Test_", 0);

  const usernameError = page.locator("text=Passwords don't match");

  await expect(usernameError).toBeVisible();
});

test("Login buyer successfully!", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.login("JohnDoe", "Test_1234", 0);

  await expect(page).toHaveURL(/\/profile/);

  const manageOrderLink = page.locator('a[href="/order"]', {
    hasText: "Manage Order",
  });

  await expect(manageOrderLink).toBeHidden();
});

test("Login seller successfully!", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.login("JaneDoe", "Test_1234", 1);

  await expect(page).toHaveURL(/\/profile/);

  const manageOrderLink = page.locator('a[href="/order"]', {
    hasText: "Manage Order",
  });

  await expect(manageOrderLink).toBeVisible();
});

test("Login username or password is incorrect!", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.login("abcd", "Test_1234", 0);

  await expect(page).toHaveURL(authPage.baseUrl);
});
