const fs = require('fs');
const prompt = require('prompt-sync')();

const user = require('./UserDetails');
const detailsObj = new user.UserDetails();

const order = require("./Orders");
const orderObj = new order.Orders();

class Operations {
    //UserRegisraion
    userRegistration() {
        detailsObj.firstName = prompt("Enter the firstname:");
        detailsObj.lastName = prompt("Enter lastname:");
        detailsObj.phoneNo = prompt("Enter phone number:");
        detailsObj.email = prompt("Enter email:");
        const  keyGeneration= this.generateUniqueKey(detailsObj.firstName, detailsObj.phoneNo);
        detailsObj.userkey = keyGeneration;
        this.ReadWriteJson(detailsObj);
        //console.log(detailsObj);
        // return detailsObj;
    }

    //writing userDetails Data into json 
    ReadWriteJson(newUserDetails) {
        const userData = fs.readFileSync("D:/HotelManagement/json/userData.json");
        const userDataObj = JSON.parse(userData);
        userDataObj.push(newUserDetails);
        const str = JSON.stringify(userDataObj);
        fs.writeFileSync("D:/HotelManagement/json/userData.json", str);
    }

    //generating unigue key
    generateUniqueKey = (name, number) => {
        return name.substring(0, 4) + number.substring(0, 4);
    };


    //showing login options for user and admin
    loginDetails() {
        const adminKey = 1234;
        let loginKey;
        console.log(" 1.Admin login \n 2.User login \n 3.exit\n");

        let choice = parseInt(prompt("Enter your choice : "));
        switch (choice) {
            case 1:
                console.log("ADMIN LOGIN ");
                loginKey = parseInt(prompt("Enter the admin key : "));
                if (loginKey == adminKey) {
                    console.log("u are logined as a ADMIN");
                    //showing options for admin
                    this.admin();
                } else {
                    console.log("WRONG kEY");
                }
                break;
            case 2:
                console.log("USER LOGIN ");
                loginKey = prompt("Enter  the user key : ");
                if (loginKey == detailsObj.userkey){
                     console.log("u are logined as a USER");
                     //showing details for order
                     this.orderMenu();
                } else {
                    console.log("WRONG kEY");
                }
                break;
            default:
                console.log("Invalid Choice!");
                break;

        }
    }
    //showmenu for order
    orderMenu(){
        let option = 0;
        do {
            console.log("Enter \n1) Order food \n2)Order Otherstuff \n3)logOut");
            option = parseInt(prompt("Enter your choice : "));
            switch (option) {
                case 1:
                    this.foodOrder();
                    break;
                case 2:
                    this.orderOtherStuff();
                    break;
            }
        } while (option != 3);
    };
    
    //Ordering Food
    foodOrder(){   
        let foodArray=new Array();
        let choice=0;
        do{
            console.log(" Enter\n1)Tea (10rs)\n2)breakfast (50rs)\n3)lunch (150rs)\n4)dinner(100rs) \n5)exit");
            choice = parseInt(prompt("Enter your choice : "));
            switch (choice) {
                case 1:
                    console.log("tea --- (20)");
                    foodArray.push(new order.Orders("Coffee", 1, 20, 20));
                    console.log("tea is added to cart");;
                    break;
                case 2:
                    console.log("breakfast --- (50)");
                    foodArray.push( new order.Orders("breakfast",1,50,50));
                    console.log("breakfast is added to cart");;
                    break;
                case 3:    
                    console.log("lunch --- (150)");
                    foodArray.push(new order.Orders("lunch",1,150,150));
                    console.log("lunch is added to cart");
                    break;  
                case 4:      
                    console.log("dinner --- (100)");
                    foodArray.push(new order.Orders("dinner",1,100,100));
                    console.log("dinner is added to cart");;
                    break; 
                default:
                    console.log("Exit");
                    break;
            
            }
        } while (choice != 5);
    }

    //showing menu for otherstuff
    orderOtherStuff () {
        let otherStuffArray = new Array();
        let option = 0;
        do {
          console.log("\nPress \n1)BedSheets \n2)pillow \n3)exit");
          option = parseInt(prompt("Enter your choice : "));
          switch (option) {
            case 1:
              otherStuffArray.push(new  order.Orders("Bedsheets", 1, 400, 400));
              console.log("\nItem added in cart.");
              break;
            case 2:
              otherStuffArray.push(new order.Orders("pillow", 1, 100, 100));
              console.log("\nItem added in cart.");
              break;
          }
        } while (option != 3);
    };

    //Admin login option
    admin() {
        let option=0;
        do {
            console.log(" 1.check user \n 2.print Bill \n 3.exit\n");
            option = parseInt(prompt("Enter the option : "));
            if(option==1){
                 const userData = fs.readFileSync("D:/HotelManagement/json/userData.json");
                 const userDataObj = JSON.parse(userData);
                 console.log(userDataObj);
            }else  if(option==2){
                let userkey = prompt("Enter key to confirm : ");
                console.log("bill:"+ this.generateBill(userkey));
            }
        }while(option !=3);

    };
    //generating bill
    generateBill = (userkey) => {
        const userData = fs.readFileSync("D:/HotelManagement/json/userData.json");
        const userDataObj = JSON.parse(userData);
        userDataObj.forEach((element) => {
          if (element.userkey == userkey) {
      
          }
        });
    }
    
}
exports.Operations = Operations;

