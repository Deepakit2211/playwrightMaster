import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { Global } from "../Support/Global";
import { SwagLabYourCart } from "../PageObjectModel/SwagLabYourCart";
import { LoginPage } from "../PageObjectModel/LoginPage";
import { SwagLabCheckoutInfo } from "../PageObjectModel/SwagLabCheckoutInfo";
import { SwagLabsProducts } from "../PageObjectModel/SwagLabsProducts";

Given(
  "User adds the products to cart and proceed to checkout.",
  {timeout:30000},
  async function (this: Global) {
    const swagLabsProducts = new SwagLabsProducts(this.page);
    const swagLabYourCart = new SwagLabYourCart(this.page);
    await swagLabsProducts.addMultipleItemsTo_theCart(3);
    await swagLabsProducts.clickOnAddToCartIcon();
    await swagLabYourCart.clickOnCheckOutButton();
  },
);

When("Enter the required checkout details", 
    {timeout:60000},
    async function (this: Global) {
  const swagLabCheckoutInfo = new SwagLabCheckoutInfo(this.page);
  await swagLabCheckoutInfo.enterAddress("Deepak", "Mishra", "110023");
  const msg = await swagLabCheckoutInfo.verifyOrderSuccessMsg();
  expect(msg).toEqual("Thank you for your order!");
});

Then("verify the content of downloaded file",
    {timeout:60000},
     async function (this: Global) {
  const swagLabCheckoutInfo = new SwagLabCheckoutInfo(this.page);
  const boolean = await swagLabCheckoutInfo.readDownloadedFile("Deepak Mishra");
  let name='';
  if(boolean){
    name="Deepak Mishra";

  }
  await this.page.waitForTimeout(30000);
  expect(boolean).toBeTruthy();

  console.log("-------------------Output-----------------------");
  console.log(await swagLabCheckoutInfo.getFileText);
  expect(name).toContain("Shashank Singh");
});
