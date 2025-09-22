import { BasePage } from './basePage.js';
import { Page, expect } from '@baseTest';
import { testStep } from '@utils';
import { CartPage } from './cartPage.js';

export class CheckoutPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  /**
   *
   * @param items - Item name or array of item names to check if they are listed in the cart
   * @description This method fills the checkout form and clicks on the finish button.
   */
  async doCheckout(items: Item | Item[]): Promise<void> {
    await testStep(`Checking out`, async () => {
      await this.page.locator('[data-test="firstName"]').fill('Jack');
      await this.page.locator('[data-test="lastName"]').fill('Sparrow');
      await this.page.locator('[data-test="postalCode"]').fill('613423');
      await this.page.locator('[data-test="continue"]').click();

      await new CartPage(this.page).checkIfItemListed(items);
      await this.page.getByRole('button', { name: 'Finish' }).click();
      await expect(this.page).toHaveURL(/checkout-complete/);
      await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
    });
  }
}
