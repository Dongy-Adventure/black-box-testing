import { test, expect } from "@playwright/test";

const BASE_URL = process.env.URL || "https://tarsmarketplace.vercel.app/";

test("Has Title", async ({ page }) => {
  await page.goto(BASE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tar's Marketplace/);
});

test("Has registration page", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the get started link.
  // await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
});
