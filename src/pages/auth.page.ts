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
    confirmPassword: string,
    userType: number
  ) {
    const registrationHeader = this.page.locator("h2", {
      hasText: "Register",
    });

    if (userType === 1) {
      await this.page.click('button:has-text("Seller")');
    }

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

  async login(username: string, password: string, userType: number) {
    await this.page.click('button:has-text("Sign In")');

    if (userType === 1) {
      await this.page.click('button:has-text("Seller")');
    }

    const signInnHeader = this.page.locator("h2", {
      hasText: "Sign In",
    });

    if (await signInnHeader.isVisible()) {
      await this.page.getByTestId("username").fill(username);
      await this.page.getByTestId("password").fill(password);

      await this.page.click('button:has-text("Sign In")');
    } else {
      console.log("No registration form found. Skipping.");
    }
  }
}
