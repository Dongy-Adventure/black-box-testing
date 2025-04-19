import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ page, authPage }) => {
  await authPage.login("demo_seller", "Test_1234", 1);
  await expect(page).toHaveURL(/\/profile/);
});

test("Create product succeed!", async ({ page, productPage }) => {
  await productPage.goto();
  await productPage.createProduct(
    "Playwright",
    "For Playwright testing only!!!",
    1,
    199,
    ["Electronics", "Book"],
    "red"
  );

  const productNameLocator = page.locator('tr >> text="Playwright"');
  await expect(productNameLocator).toBeVisible();
  await productPage.deleteProduct("Playwright");
});

test("Price less than 1!", async ({ page, productPage }) => {
  await productPage.goto();
  await productPage.createProduct(
    "Playwright Failed",
    "For Playwright testing only!!!",
    1,
    0.95,
    ["Electronics", "Book"],
    "red"
  );

  await expect(
    page.getByRole("heading", { name: "Product Detail" })
  ).toBeVisible();
});

test("Amount less than 0!", async ({ page, productPage }) => {
  await productPage.goto();
  await productPage.createProduct(
    "Playwright Failed",
    "For Playwright testing only!!!",
    0,
    0.95,
    ["Electronics", "Book"],
    "red"
  );

  await expect(
    page.getByRole("heading", { name: "Product Detail" })
  ).toBeVisible();
});

test("Update product succeed!", async ({ page, productPage }) => {
  await productPage.goto();
  await productPage.createProduct(
    "Playwright",
    "For Playwright testing only!!!",
    1,
    32,
    ["Electronics"],
    "red"
  );
  await productPage.updateProduct(
    "Playwright",
    "For Playwright testing only!!!",
    10,
    33,
    ["Electronics", "Book"],
    "blue"
  );

  const productNameLocator = page.locator('tr >> text="Playwright"');
  await expect(productNameLocator).toBeVisible();
  await productPage.deleteProduct("Playwright");
});

test("Delete product succeed!", async ({ page, productPage }) => {
  await productPage.goto();
  await productPage.createProduct(
    "TestDelete",
    "For Playwright testing only!!!",
    5,
    10,
    ["Electronics", "Book"],
    "blue"
  );

  await productPage.deleteProduct("TestDelete");

  await expect(page.locator("tr", { hasText: "TestDelete" })).toHaveCount(0);
});
