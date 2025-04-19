import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ page, authPage }) => {
  await authPage.login("demo_buyer", "Test_1234", 0);
  await expect(page).toHaveURL(/\/profile/);
});

test("Successfully change profile!", async ({
  page,
  identityManagementPage,
}) => {
  await identityManagementPage.goto();

  const name = "Demo";
  const surname = "Update";
  const phone = "1234567890";
  const address = "5/12 Mars";

  await identityManagementPage.updateProfile(name, surname, phone, address);

  await expect(page.getByTestId("name")).toHaveValue(name);
  await expect(page.getByTestId("surname")).toHaveValue(surname);
  await expect(page.getByTestId("phone")).toHaveValue(phone);
  await expect(page.getByTestId("address")).toHaveValue(address);
});

test("Phonenumber length not equal to 10!", async ({
  page,
  identityManagementPage,
}) => {
  await identityManagementPage.goto();

  const name = "Demo";
  const surname = "Update";
  const phone = "123456789";
  const address = "5/12 Mars";

  await identityManagementPage.updateProfile(name, surname, phone, address);

  const phoneno = page.locator("text=Phone number must be at least 10 digits");

  await expect(phoneno).toBeVisible();
});

test("Address too short", async ({ page, identityManagementPage }) => {
  await identityManagementPage.goto();

  const name = "Demo";
  const surname = "Update";
  const phone = "123456789";
  const address = "5";

  await identityManagementPage.updateProfile(name, surname, phone, address);

  const phoneno = page.locator("text=Address is too short");

  await expect(phoneno).toBeVisible();
});
