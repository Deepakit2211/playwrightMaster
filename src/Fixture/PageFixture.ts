import {test as base, expect} from '@playwright/test';
import {LoginPage} from 'LoginPage';


type PageFixture={
    loginPage:LoginPage

}

const test=base.extends<PageFixture>({
    loginPage: async({page},use)=>{
        await use(new LoginPage(page));
    }
});

export {expect, test};