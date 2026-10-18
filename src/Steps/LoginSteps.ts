import {expect} from '@playwright/test';
import{Given, Then, When} from '@cucumber/cucumber';
import{LoginPage} from '../PageObjectModel/LoginPage';
import {Global} from '../Support/Global';
import { STORAGE_STATE_PATH } from '../Support/Hooks';

Given(
    'Launch URL and Navigate to the Login Page',{timeout:3*60*1000},
    async function(this:Global){
        const loginPage=new LoginPage(this.page);
        await loginPage.openLoginPage();
        await this.page.waitForTimeout(60*1000);

    }
);


When(
    'Enter username and password',
    {timeout:30000},
     async function(this:Global){
        const loginPage = new LoginPage(this.page);

        // storageState may have already authenticated this context (see Hooks.ts).
        // If so, the login form won't be present — skip filling it and move on.
        if (await loginPage.isAlreadyLoggedIn()) {
            console.log('Session reused from storageState — skipping login form.');

            return;
        }

        await loginPage.login("standard_user","secret_sauce");
        console.log('I am logged In and going to store the cookies.');

        // A real login just happened — refresh the saved session so the next
        // run can reuse it (and reset its "freshness" clock).
        await this.context.storageState({ path: STORAGE_STATE_PATH });

     }
)