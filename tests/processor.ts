import { Users } from '@enums';
import { LeftMenuPage, LoginPage, InventoryPage, CartPage, CheckoutPage } from '@pages';
import { expect, Page } from '@playwright/test';

export async function checkoutTest(page: Page, vuContext: any, events: any, test: any): Promise<void> {
  const { step } = test;
  (global as any).artilleryTestStep = step;

  await new LoginPage(page).login(Users.STANDARD_USER);
  const itemList: Item[] = await new InventoryPage(page).addToCart(['Sauce Labs Backpack']);
  await new CartPage(page).checkoutItems(itemList);
  await new CheckoutPage(page).doCheckout(itemList);
  await page.goto('inventory.html');

  expect(await new InventoryPage(page).getCartCount()).toBe(0);

  await new LeftMenuPage(page).selectMenu('Logout');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
}
