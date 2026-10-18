import {Before, After, Status } from '@cucumber/cucumber';
import{chromium} from '@playwright/test';
import {Global} from './Global';
import { isStorageStateValid } from '../Utils/CommonUtils';
import * as path from 'path';
import * as allure from 'allure-js-commons'
import 'allure-cucumberjs';

export const STORAGE_STATE_PATH = path.join(process.cwd(),  './storageState/auth.json');
export const STORAGE_STATE_MAX_AGE_MS = 2 * 60 * 60 * 1000; // treat session as expired after 24 hours

Before(async function(this:Global){
    this.browser=await chromium.launch({headless:false});

    // Reuse the saved session only if the file exists AND isn't older than the max age.
    // Otherwise start with a plain context - the login steps will detect this and log in for real.
    if (isStorageStateValid(STORAGE_STATE_PATH, STORAGE_STATE_MAX_AGE_MS)) {
        console.log("Right now in hook if");
        this.context = await this.browser.newContext({ storageState: STORAGE_STATE_PATH });
    } else {
         console.log("Right now in hook else");
        this.context = await this.browser.newContext();
    }

    this.page= await this.context.newPage();
   

});


After(async function(this:Global, scenario){
    try {
        if(scenario.result?.status === Status.FAILED && this.page){
            const ex = scenario.result.exception;
            // Playwright expect() failures come through as type 'ExpectError'
            await allure.label('failureType', ex?.type === 'ExpectError' ? 'assertion' : 'error');

            const screenshot = await this.page.screenshot({ fullPage: true });
            await allure.attachment('Failure Screenshot', screenshot, 'image/png');
        }
    } finally {
        await this.context?.close();
        await this.browser?.close();
    }
});
