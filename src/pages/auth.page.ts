import { Page } from "@playwright/test";
import path from "path";

export class AuthPage {
  baseUrl = process.env.URL || `http://localhost:3000`;
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async register(
    username: string,
    password: string,
    name: string,
    surname: string,
    confirmPassword: string
  ) {
    const registrationHeader = this.page.locator("h2", {
      hasText: "Register",
    });

    if (await registrationHeader.isVisible()) {
      const imagePath = path.resolve(__dirname, "../assets/test-avatar.png");
      await this.page.getByTestId("image").setInputFiles(imagePath);

      await this.page.getByTestId("name").fill(name);
      await this.page.getByTestId("surname").fill(surname);
      await this.page.getByTestId("username").fill(username);
      await this.page.getByTestId("password").fill(password);
      await this.page.getByTestId("confirm-password").fill(confirmPassword);

      await this.page.click('button:has-text("Register")');
    } else {
      console.log("No registration form found. Skipping.");
    }
  }
}
