import { BasePage } from "./base.page";

export class OrderPage extends BasePage {
  baseUrl = process.env.URL
    ? process.env.URL + "/home"
    : "http://localhost:3000/home";

  async addProductToCart(name: string, amount: number) {
    await this.goto();
    const product = this.page.locator(`[data-testid="product-${name}"]`);
    await product.click();

    const decreaseButton = this.page.locator('[data-testid="decrease-button"]');
    const countValue = this.page.locator('[data-testid="count-value"]');
    const increaseButton = this.page.locator('[data-testid="increase-button"]');

    let count = parseInt((await countValue.textContent()) ?? "1");

    while (count < amount) {
      await increaseButton.click();
      count++;
    }

    while (count > amount) {
      await decreaseButton.click();
      count--;
    }

    await this.page.locator('button:has-text("ADD TO CART")').click();
  }

  async deleteProductInCart(name: string) {
    const productRow = this.page.locator("tr", {
      hasText: name,
    });

    const deleteButton = productRow.locator(
      'button svg[aria-hidden="true"][role="img"]'
    );

    await deleteButton.click();
  }

  async addCartToPayment(names: string[]) {
    for (const name of names) {
      const productRow = this.page.locator("tr", {
        hasText: name,
      });

      const checkbox = productRow.locator('input[type="checkbox"]');

      await checkbox.waitFor({ state: "visible" });
      const isChecked = await checkbox.isChecked();
      if (!isChecked) {
        await checkbox.click();
      }
    }

    await this.page
      .locator("button", {
        hasText: "Check out",
      })
      .click();
  }

  async payByCash() {
    await this.page.locator("label", { hasText: "Cash on delivery" }).click();

    await this.page
      .locator("button", {
        hasText: "Place Order",
      })
      .click();
  }

  async payByCreditCard(
    cardName: string,
    cardNo: string,
    expM: string,
    expY: string,
    cvv: string
  ) {
    await this.page.locator("label", { hasText: "Debit/Credit Card" }).click();

    await this.page.getByTestId("cardholder-name").fill(cardName);
    await this.page.getByTestId("card-number").fill(cardNo);
    await this.page.getByTestId("expiry-month").fill(expM);
    await this.page.getByTestId("expiry-year").fill(expY);
    await this.page.getByTestId("cvv").fill(cvv);

    await this.page.getByRole("button", { name: "Place Order" }).click();
  }
}
