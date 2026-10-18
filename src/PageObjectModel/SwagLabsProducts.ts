import{Page,expect} from '@playwright/test';
import {generateRandomNumber} from '../Utils/CommonUtils';

export class SwagLabsProducts{
    readonly page:Page;
    readonly addToCartButton;
    readonly addToCartIcon;
    readonly removeButton;



    constructor(page:Page){
        this.page=page;
        this.addToCartButton=page.getByRole('button',{name:'Add to cart'});
        this.addToCartIcon=page.locator(".shopping_cart_link");
        this.removeButton=page.getByRole('button',{name:'Remove'});
    }

    async addItemToCart(){
        await this.addToCartButton.first().click();
    }

    async addMultipleItemsTo_theCart(items:number ){
    const availableItems=await this.addToCartButton.count();
    if(items>availableItems){
        throw new Error(`Requested ${items} items, but only ${items} are available.`);
    }
        let count=0;
        while(count<items){
           await this.addToCartButton.nth(count).click();
           count++;
        }
    }

    async getCountOfRemoveButton():Promise<number>{

        const rmCount=await this.removeButton.count();
        return rmCount;

    }

    async clickOnAddToCartIcon(){
       await this.addToCartIcon.click();
    }

      async getAddedItemCount():Promise<number>{
       return await this.addToCartIcon.count();
    }

}

