import {Page} from '@playwright/test'

export class SwagLabYourCart{

    readonly page:Page
    readonly continueShoppingButton;
    readonly checkoutButton;
    readonly removeButton;

  constructor(page:Page){
    this.page=page;
    this.continueShoppingButton=this.page.getByRole('button',{name:'Continue Shopping'});
    this.checkoutButton=this.page.getByRole('button',{name:'Checkout'});
    this.removeButton=this.page.getByRole('button',{name:'Remove'});
  }

  async navigateBacktoProductPage(){
    await this.continueShoppingButton.click();
  }

  async clickOnCheckOutButton(){
    await this.checkoutButton.click();
  }

  async removeProductAddedToCart(removeProduct=1){
    const totalProduct= await this.removeButton.count();
    if(totalProduct===0){
      throw new Error("Cart is empty");
    }else if(removeProduct>totalProduct){

      throw new Error(`Cannot remove ${removeProduct} product because ${totalProduct} product available`);

    }else if(removeProduct===0){
      console.log("Product not removed from the cart");

    }else{
        for(let i=0;i<removeProduct;i++){
        await this.removeButton.nth(0).click();
      }

    }

    }
  

}