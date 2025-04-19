import { BasePage } from "./base.page";

export class IdentityManagementPage extends BasePage {
  baseUrl = process.env.URL
    ? process.env.URL + "/profile/edit"
    : "http://localhost:3000/profile/edit";

  async updateProfile(
    name: string,
    surname: string,
    phone: string,
    address: string
  ) {
    await this.page.getByTestId("name").fill(name);
    await this.page.getByTestId("surname").fill(surname);
    await this.page.getByTestId("phone").fill(phone);
    await this.page.getByTestId("address").fill(address);

    const provinceSelect = this.page.getByTestId("province");
    const provinceOptions = await provinceSelect.locator("option").all();

    const provinceValues = await Promise.all(
      provinceOptions.map(async (opt) => {
        const value = await opt.getAttribute("value");
        return value;
      })
    );

    const validProvinceValues = provinceValues.filter((v) => v && v !== "");
    const randomProvince =
      validProvinceValues[
        Math.floor(Math.random() * validProvinceValues.length)
      ];

    await provinceSelect.selectOption(randomProvince);

    const districtSelect = this.page.getByTestId("district");
    await this.page.waitForTimeout(300);

    const districtOptions = await districtSelect.locator("option").all();
    const districtValues = await Promise.all(
      districtOptions.map(async (opt) => {
        const value = await opt.getAttribute("value");
        return value;
      })
    );

    const validDistrictValues = districtValues.filter((v) => v && v !== "");
    const randomDistrict =
      validDistrictValues[
        Math.floor(Math.random() * validDistrictValues.length)
      ];

    await districtSelect.selectOption(randomDistrict);

    await this.page.getByRole("button", { name: "Update" }).click();
  }
}
