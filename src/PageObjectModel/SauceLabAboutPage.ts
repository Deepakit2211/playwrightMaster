import {Page} from '@playwright/test';

export class SauceLabAboutPage{
readonly page:Page;
readonly openMenuIconButton;
readonly aboutLinkButton;
readonly whySauceLabsMTE;

constructor(page:Page){
this.page=page;
this.openMenuIconButton=this.page.locator(#react-burger-menu-btn);
this.aboutLinkButton=this.page.locator(#about_sidebar_link);
}


}
