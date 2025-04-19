import { Page } from "@playwright/test";

export abstract class BasePage {
  baseUrl = process.env.URL || "http://localhost:3000";
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }
}
