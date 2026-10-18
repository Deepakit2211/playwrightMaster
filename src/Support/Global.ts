import {World, setWorldConstructor} from '@cucumber/cucumber';

import {Browser, BrowserContext, Page} from '@playwright/test';



export class Global extends World {

    browser!:Browser;
    context!:BrowserContext;
    page!: Page;
  


}

setWorldConstructor(Global);
