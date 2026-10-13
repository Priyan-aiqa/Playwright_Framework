const {test} = require ('@playwright/test');
const {LoginPage} = require ('../pages/LoginPage.js');

test('Login to sause demo website ', async ({ page }) => { 
    const loginPage = new LoginPage(page);
   await loginPage.login("standard_user","secret_sauce" );
} );
