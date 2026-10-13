console.log("Hellow World");
let name = "Priyan"
console.log(name);
let number ="1234567890"
console.log(number);

const url ="www.google.com"
console.log(url);

number = '0987654321'
console.log(number);
//We cannot Decler a duplicate / override value for constant . 

 const {sayHello,sayBye} = require('./2_Test');
 sayHello ();
 sayBye ();

const LoginPage = require ("./3_LoginPage");
const page = new LoginPage ;
page.signUp();
page.logIn();
page.forgotPassword(); 
