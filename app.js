
const prompt = require('prompt-sync')();

//welcome message
console.log("Welcome to HotelManagement JS Program ")
const operate = require('./src/utility/Operations')
const operateObj = new operate.Operations();

let choice = 0;
do {
    console.log("Press: \n1) Add user  \n2)loginDetails \n3)exit")
    choice = Number(prompt("Enter your choice: "));
    if (choice == 1) {
        operateObj.userRegistration();
    }
    if (choice == 2) {
        operateObj.loginDetails();
    }

} while (choice != 3);



