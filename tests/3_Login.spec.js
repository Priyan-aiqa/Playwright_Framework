
const {test} = require ('@playwright/test');

test('Open sause demo website ', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  //await page.click("text=Login");


//USING GETBYROLE
//   await page.getByRole('textbox',{name: 'Username'}).fill("standard_user");
//   await page.getByRole('textbox',{name: 'Password'}).fill("secret_sauce");
//await page.getByRole('button',{name: 'Login' }).click();

//USING CCS WIHT ID = #

//   await page.fill("#user-name","standard_user");
//   await page.fill("#password","secret_sauce");
//   await page.click(".submit-button");
  
//Usig same css 
//   await page.fill("input[id='user-name']" , "standard_user");
//   await page.fill("input[id='password']" , "secret_sauce");
//   await page.click("input[value='Login']");

  //Usig Xpath 
  await page.locator("//input[@id='user-name']").fill("standard_user");
  await page.locator("//input[@id='password']").fill("secret_sauce");
  await page.locator("//input[@name='login-button']").click();
  
});

