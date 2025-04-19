import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ page, authPage }) => {
  await authPage.login("demo_buyer", "Test_1234", 0);
  await expect(page).toHaveURL(/\/profile/);
});

test("Add product to cart succeed!", async ({ page, orderPage }) => {
  await orderPage.addProductToCart("Test 1", 2);

  await expect(page).toHaveURL(/\/buyer\/cart/);
  const productNameLocator = page.locator('tr >> text="Test 1"');
  await expect(productNameLocator).toBeVisible();
  await orderPage.deleteProductInCart("Test 1");
});

test("Delete product in cart succeed!", async ({ page, orderPage }) => {
  await orderPage.addProductToCart("Test 1", 1);
  await orderPage.deleteProductInCart("Test 1");

  const productNameLocator = page.locator('tr >> text="Test 1"');
  await expect(productNameLocator).toBeHidden();
});

test("Add products to order succeed!", async ({ page, orderPage }) => {
  await orderPage.addProductToCart("Test 1", 1);
  await orderPage.addProductToCart("Test 2", 1);

  await orderPage.addCartToPayment(["Test 1", "Test 2"]);

  await expect(page).toHaveURL(/\/buyer\/summary/);

  await orderPage.addProductToCart("Test 2", 1);
  await orderPage.deleteProductInCart("Test 1");
  await orderPage.deleteProductInCart("Test 2");
});

test("Add products to order failed (No product selected)", async ({
  page,
  orderPage,
}) => {
  await orderPage.addProductToCart("Test 1", 1);
  await orderPage.addProductToCart("Test 2", 1);

  await orderPage.addCartToPayment([]);

  await expect(
    page.getByText("Please add at least one item to continue!")
  ).toBeVisible();

  await orderPage.addProductToCart("Test 2", 1);
  await orderPage.deleteProductInCart("Test 1");
  await orderPage.deleteProductInCart("Test 2");
});

test("Pay by cash!", async ({ page, orderPage }) => {
  await orderPage.addProductToCart("Test 1", 1);

  await orderPage.addCartToPayment(["Test 1"]);

  await orderPage.payByCash();

  await expect(page).toHaveURL(/\/buyer\/summary\/complete/);
});

test("Pay by credit / debit card succeed!", async ({ page, orderPage }) => {
  await orderPage.addProductToCart("Test 1", 1);

  await orderPage.addCartToPayment(["Test 1"]);

  await orderPage.payByCreditCard(
    "John Doe",
    "4242424242424242",
    "12",
    "29",
    "123"
  );

  await expect(page).toHaveURL(/\/buyer\/summary\/complete/);
});
