import {Page, expect} from '@playwright/test';

export class LoginPage{

    readonly page:Page;
readonly usernameInput;
readonly passwordInput;
readonly loginButton;


constructor(page:Page){
    this.page=page;
this.usernameInput=page.getByPlaceholder('Username');
this.passwordInput=page.getByPlaceholder('Password');
this.loginButton=page.getByRole('button',{name:'Login'});

}

 async openLoginPage() {
    if(await this.isAlreadyLoggedIn()){
      await this.page.goto('https://www.saucedemo.com/inventory.html');
      return;  

    }
        await this.page.goto('https://www.saucedemo.com/');

    }

async login(username:string,password:string){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
     await this.page.waitForTimeout(2000)
    await this.loginButton.click();

}

/**
 * True if the login form isn't present — meaning storageState already
 * authenticated this context and we landed straight on the inventory page.
 */
async isAlreadyLoggedIn(): Promise<boolean> {
   const cookies = await this.page.context().cookies();
  cookies.forEach(e => {
    console.log("Please see the cookie: " + e.name);
});
   

    return cookies.some(
        cookie =>
            cookie.name === 'session-username' &&
            cookie.value === 'standard_user'
    );
}

}

