import { test as base, Browser, Page } from "@playwright/test";
import { AuthPage } from "../pages/auth.page";
import { ProductPage } from "../pages/product.page";
import { OrderPage } from "../pages/order.page";
import { IdentityManagementPage } from "../pages/identity-management.page";

type TestFixtures = {
  context: Awaited<ReturnType<Browser["newContext"]>>;
  page: Page;
  authPage: AuthPage;
  productPage: ProductPage;
  orderPage: OrderPage;
  identityManagementPage: IdentityManagementPage;
};

export const test = base.extend<TestFixtures>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    return context;
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto(process.env.URL || "http://localhost:3000");
    await page.evaluate(() => localStorage.clear());
    await use(page);
  },

  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },

  identityManagementPage: async ({ page }, use) => {
    await use(new IdentityManagementPage(page));
  },
});
