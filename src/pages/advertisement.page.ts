import { BasePage } from "./base.page";

export class AdvertisementPage extends BasePage {
  baseUrl = process.env.URL
    ? process.env.URL + "/home"
    : "http://localhost:3000/home";

  async addProductToCart(name: string, amount: number) {}
}
