import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
  baseUrl = process.env.URL
    ? process.env.URL + "/seller/product-on-display"
    : "http://localhost:3000/seller/product-on-display";

  async createProduct(
    name: string,
    desc: string,
    amount: number,
    price: number,
    tags: string[],
    color: string
  ) {
    await this.page.click('button:has-text("+ Add new product")');

    await this.page.getByTestId("name").fill(name);
    await this.page.locator("textarea").fill(desc);
    await this.page.getByTestId("amount").fill(amount.toString());
    await this.page.getByTestId("price").fill(price.toString());
    for (const tag of tags) {
      await this.page.getByTestId(`tag-${tag}`).click();
    }
    await this.page.getByTestId(`color-${color}`).click();

    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async updateProduct(
    name: string,
    desc: string,
    amount: number,
    price: number,
    tags: string[],
    color: string
  ) {
    const row = this.page.locator("tr", {
      has: this.page.locator(`text=${name}`),
    });

    const editButton = row.locator("button").first();

    await editButton.click();

    await this.page.getByTestId("name").fill(name);
    await this.page.locator("textarea").fill(desc);
    await this.page.getByTestId("amount").fill(amount.toString());
    await this.page.getByTestId("price").fill(price.toString());

    for (const tag of tags) {
      const tagLocator = this.page.getByTestId(`tag-${tag}`);
      if (await tagLocator.isVisible()) {
        await tagLocator.click();
      }
    }

    const colorLocator = this.page.getByTestId(`color-${color}`);
    if (await colorLocator.isVisible()) {
      await colorLocator.click();
    }

    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async deleteProduct(name: string) {
    const row = this.page.locator("tr", {
      has: this.page.locator(`text=${name}`),
    });

    const deleteButton = row.locator("button").nth(1);

    await deleteButton.click();
  }
}
