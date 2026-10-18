import {Page} from '@playwright/test';
import fs from 'fs'

import * as path from 'path';
import { PDFParse } from 'pdf-parse';

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

export class SwagLabCheckoutInfo{
    readonly page:Page;
    readonly firstNameInput;
    readonly lastNameInput;
    readonly zipOrPostalCodeInput;
    readonly cancelButton
    readonly continueButton;
    readonly finishButton;
    readonly orderSuccessMsg;
    readonly generatePDFOrderButton;
    readonly backHomeButton;

   constructor(page:Page){
    this.page=page;
    this.firstNameInput=this.page.getByPlaceholder('First Name');
    this.lastNameInput=this.page.getByPlaceholder('Last Name');
    this.zipOrPostalCodeInput=this.page.getByPlaceholder('Zip/Postal Code');
    this.continueButton=this.page.locator("//input[@id='continue']");
    this.cancelButton=this.page.getByRole('button',{name:'Cancel'});
    this.finishButton=this.page.getByRole('button',{name:'Finish'});
    this.orderSuccessMsg=this.page.locator('.complete-header');
    this.generatePDFOrderButton=this.page.getByRole('button',{name:'Generate PDF order'});
    this.backHomeButton=this.page.getByRole('button',{name:'Back Home'});
   }

   async  enterAddress(firstName:string, lastname:string, zipCode:string){
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastname);
    await this.zipOrPostalCodeInput.fill(zipCode)
   }

   async  verifyOrderSuccessMsg():Promise<string>{
    await this.continueButton.click();
    await this.finishButton.click();
    return await this.orderSuccessMsg.innerText();

   }

   async downloadGeneratedPDFFile():Promise<string>{
    const downloadPromise=this.page.waitForEvent('download');
    await this.generatePDFOrderButton.click();
    const download=await downloadPromise;
   
    const fileName=download.suggestedFilename();
    const filePath=path.join(process.cwd(),'download',fileName);
    if(!(fileName.includes('swag-labs-order-'))){
        throw new Error(`${fileName} does not contain string=> swag-labs-order-`);
    }

    await download.saveAs(filePath);
    console.log("Where the file is located "+filePath);
        return filePath;

   }

   async readDownloadedFile(fileContent:string):Promise<boolean>{
    const filePath=await this.downloadGeneratedPDFFile();
    
   const pdfBuffer =
        fs.readFileSync(filePath);

    const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(pdfBuffer)
}).promise;

    let pdfText = '';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

        const page =
            await pdf.getPage(pageNumber);

        const textContent =
            await page.getTextContent();

        const pageText =
            textContent.items
                .map((item: any) => item.str)
                .join(' ');

        pdfText += pageText + '\n';
    }

    console.log('========== PDF TEXT ==========');
    console.log(pdfText);
    console.log('========== END PDF TEXT ==========');



   // return pdfText.includes(fileContent);

    if(pdfText.includes(fileContent)){
        return true;
    }else{
        return false
    }


   }


}
