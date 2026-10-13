class LoginPage {
constructor (page){
    this.page = page ;
}

async login (username , password){
    await this.page.goto('https://saucedemo.com/');
    await this.page.locator("//input[@id='user-name']").fill("standard_user");
    await this.page.locator("//input[@id='password']").fill("secret_sauce");
    await this.page.locator("//input[@name='login-button']").click();
}
    
}
module.exports = {LoginPage} ; 