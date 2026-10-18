import {Page} from '@playwright/test';

export class LogoutPage{
    readonly page:Page;
    readonly openMenuIconButton;
    readonly logoutButton;
    readonly usernameInput;

    constructor(page:Page){
        this.page:page;
        this.openMenuIconButton=this.page.locator(#react-burger-menu-btn);
        this.logoutButton=this.page.getByText('Logout');
        this.usernameInput=page.getByPlaceholder('Username');

    }

    async function logout(){
       await this.openMenuIconButton.click();
       await this.logoutButton.click();
    }

    async function isUserInputDisplayed(timeout=5000):Promise<boolean>{
        try{
            await this.usernameInput.waitFor({states:visible, timeout});
            return true;
        }catch{
            return false;
        }
        
    }


}