import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ authPage }) => {
  await authPage.goto();
});

test("Registered buyer succeed!", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.register(
    `JohnDoe${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`,
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
    `JaneDoe${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`,
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

test("Register password does not match the standard (character length)", async ({
  page,
  authPage,
}) => {
  await authPage.goto();

  await authPage.register("abcd", "tes_", "John", "Doe", "tes_", 0);

  const usernameError = page.locator(
    "text=Password must be at least 8 characters long"
  );

  await expect(usernameError).toBeVisible();
});

test("Register password does not match the standard (uppercase letter)", async ({
  page,
  authPage,
}) => {
  await authPage.goto();

  await authPage.register("abcd", "test_12345", "John", "Doe", "test12345", 0);

  const usernameError = page.locator(
    "text=Password must contain at least one uppercase letter"
  );

  await expect(usernameError).toBeVisible();
});

test("Register password does not match the standard (special character)", async ({
  page,
  authPage,
}) => {
  await authPage.goto();

  await authPage.register("abcd", "Test12345", "John", "Doe", "Test12345", 0);

  const usernameError = page.locator(
    "text=Password must contain at least one special character"
  );

  await expect(usernameError).toBeVisible();
});

test("Register confirm password wrong", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.register("abcd", "Test_1234", "John", "Doe", "Test_", 0);

  const usernameError = page.locator("text=Passwords don't match");

  await expect(usernameError).toBeVisible();
});

test("Login buyer succeed!", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.login("demo_buyer", "Test_1234", 0);

  await expect(page).toHaveURL(/\/profile/);

  const manageOrderLink = page.locator('a[href="/order"]', {
    hasText: "Manage Order",
  });

  await expect(manageOrderLink).toBeHidden();
});

test("Login seller succeed!", async ({ page, authPage }) => {
  await authPage.goto();

  await authPage.login("demo_seller", "Test_1234", 1);

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
