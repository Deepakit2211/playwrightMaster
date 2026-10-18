import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const STORAGE_STATE_PATH = path.join(__dirname, '..', 'storageState', 'auth.json');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Confirm login actually succeeded before saving state
    await page.waitForURL('**/inventory.html');

    // Ensure the folder exists
    fs.mkdirSync(path.dirname(STORAGE_STATE_PATH), { recursive: true });

    await context.storageState({ path: STORAGE_STATE_PATH });
    console.log(`Storage state saved to ${STORAGE_STATE_PATH}`);

    await browser.close();
})();
