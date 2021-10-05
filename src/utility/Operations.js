const fs = require('fs');
const prompt = require('prompt-sync')();
const JsonToXlsx = require("xlsx");

const user = require('./UserDetails');
const detailsObj = new user.UserDetails();

const order = require("./Orders");

class Operations {
    loggedUser = '';

    /**
     * registering the new user
     */
    userRegistration() {
        detailsObj.firstName = prompt("Enter the firstname:");
        detailsObj.lastName = prompt("Enter lastname:");
        detailsObj.phoneNo = prompt("Enter phone number:");
        detailsObj.email = prompt("Enter email:");
        detailsObj.durationOfStay = prompt("Enter duration of stay (in days) : ");
        const keyGeneration = this.generateUniqueKey(detailsObj.firstName, detailsObj.phoneNo);
        detailsObj.userkey = keyGeneration;
        detailsObj.checkInDate = new Date();
        this.writeOrders(detailsObj, "D:/HotelManagement/json/userData.json");
        //console.log(detailsObj);
        // return detailsObj;
    }

    //generating unigue key
    generateUniqueKey = (name, number) => {
        return name.substring(0, 4) + number.substring(0, 4);
    };

    /**
     * showing login options for user and admin
     */
    loginDetails() {
        console.log(" 1.Admin login \n 2.User login \n 3.exit\n");
        let choice = parseInt(prompt("Enter your choice : "));
        switch (choice) {
            case 1:
                this.adminLogin();
                break;
            case 2:
                this.userLogin();
                break;
            default:
                console.log("Invalid Choice!");
                break;
        }
    }

    //login as admin
    adminLogin() {
        const adminKey = 1234;
        console.log("ADMIN LOGIN ");
        let loginKey = parseInt(prompt("Enter the admin key : "));
        if (loginKey == adminKey) {
            console.log("u are logined as a ADMIN");
            //showing options for admin
            this.admin();
        } else {
            console.log("WRONG kEY");
        }
    }

    /**
     * this method will ask userkey if it is found this userlogin method will called
     */
    userLogin() {
        console.log("USER LOGIN ");
        let loginKey = prompt("Enter  the user key : ");
        const userData = fs.readFileSync("D:/HotelManagement/json/userData.json");
        const userDataObj = JSON.parse(userData);
        for (let user in userDataObj) {
            if ((userDataObj[user].userkey) === loginKey) {
                this.loggedUser = userDataObj[user];
                console.log("WELCOME USER");
                this.orderMenu();
            } else {
                console.log("Wrong USERKEY");
            }
        }
    }

    /**
     * showing odermenu details to user
     */
    orderMenu() {
        let flag = true;
        do {
            console.log("Enter \n1) Order food \n2)Order Otherstuff \n3)logOut");
            let option = parseInt(prompt("Enter your choice : "));
            switch (option) {
                case 1:
                    this.foodOrder();
                    break;
                case 2:
                    this.orderOtherStuff();
                    break;
                case 3:
                    flag = false;
                    break;
                default:
                    console.log("invalid choice");
                    break
            }
        } while (flag);
    };

    //Ordering Food
    foodOrder() {
        let flag = true;
        do {
            console.log(" Enter\n1)Tea (20rs)\n2)breakfast (50rs)\n3)lunch (150rs)\n4)dinner(100rs) \n5)exit");
            let choice = parseInt(prompt("Enter your choice : "));
            switch (choice) {
                case 1:
                    console.log("tea --- (20)");
                    this.writeOrders(new order(this.loggedUser.userkey, "tea", 1, 20, 20),
                        "D:/HotelManagement/json/userOrders.json");
                    console.log("tea is added to cart");;
                    break;
                case 2:
                    console.log("breakfast --- (50)");
                    this.writeOrders(new order(this.loggedUser.userkey, "breakfast", 1, 50, 50),
                        "D:/HotelManagement/json/userOrders.json");
                    console.log("breakfast is added to cart");;
                    break;
                case 3:
                    console.log("lunch --- (150)");
                    this.writeOrders(new order(this.loggedUser.userkey, "lunch", 1, 150, 150),
                        "D:/HotelManagement/json/userOrders.json");
                    console.log("lunch is added to cart");
                    break;
                case 4:
                    console.log("dinner --- (100)");
                    this.writeOrders(new order(this.loggedUser.userkey, "dinner", 1, 100, 100),
                        "D:/HotelManagement/json/userOrders.json");
                    console.log("dinner is added to cart");;
                    break;
                case 5:
                    flag = false;
                    break;
                default:
                    console.log("Invalid choice");
                    break;

            }
        } while (flag);
    }

    //showing menu for otherstuff
    orderOtherStuff() {
        let option = 0;
        do {
            console.log("\nPress \n1)BedSheets \n2)pillow \n3)exit");
            option = parseInt(prompt("Enter your choice : "));
            switch (option) {
                case 1:
                    this.writeOrders(new order(this.loggedUser.userkey, "Bedsheets", 1, 400, 400),
                        "D:/HotelManagement/json/userOrders.json");
                    console.log("\nItem added in cart.");
                    break;
                case 2:
                    this.writeOrders(new order(this.loggedUser.userkey, "pillow", 1, 100, 100),
                        "D:/HotelManagement/json/userOrders.json");
                    console.log("\nItem added in cart.");
                    break;
                case 3:
                    option = 3;
                    break;
                default:
                    break;
            }
        } while (option != 3);
    };

    /**
    * wrting userDetails into json
    */
    writeOrders(newUserDetails, filepath) {
        try {
            const userData = JSON.parse(fs.readFileSync(filepath));
            userData.push(newUserDetails);
            fs.writeFileSync(filepath, JSON.stringify(userData));
        } catch {
            let userArray = new Array();
            userArray.push(newUserDetails);
            fs.writeFileSync(filepath, JSON.stringify(userArray));
        }
    }

    /**
     * ADMIN lOGIN OPERATIONS
     */
    admin() {
        let option = 0;
        do {
            console.log(" 1.check user \n 2.print Bill \n 3.generate report\n 4.exit");
            option = parseInt(prompt("Enter the option : "));
            if (option == 1) {
                const userData = fs.readFileSync("D:/HotelManagement/json/userData.json");
                const userDataObj = JSON.parse(userData);
                console.log(userDataObj);
            } else if (option == 2) {
                this.checkOut();
            } else if (option == 3) {
                this.jsonToXlsx("D:/HotelManagement/json/updatedUserData.json", "./reports/UserData.xlsx", 'UserData');
                this.jsonToXlsx("D:/HotelManagement/json/userOrders.json", "./reports/OrderHistory.xlsx", 'OrderHistory');
            }
        } while (option != 3);

    };

    /**
     * generating bill  for the user
     */
    generateBill = (userkey, checkInDate, checkOutDate) => {
        const orderData = this.getJsonObj("D:/HotelManagement/json/userOrders.json");
        const userData = this.getJsonObj("D:/HotelManagement/json/userData.json");
        let sum = 0; let stay = 0;
        let diff = checkOutDate.getHours() - checkInDate.getHours();
        orderData.forEach(element => {
            if (element.userkey === userkey) {
                sum += element.price;
            }
        });
        userData.forEach(element => {
            if (element.userkey === userkey) {
                stay = element.durationOfStay;
            }
        });
        if (diff < 12) {
            return sum += 500;
        } else {
            return sum += stay * 1000;
        }
    }

    /**
     * checkout method will generate the total bill
     */
    checkOut = () => {
        let userkey = this.loggedUser.userkey;
        let checkOutDate = new Date();
        let checkInDate = new Date(this.loggedUser.checkInDate);
        let sum = this.generateBill(userkey, checkInDate, checkOutDate);
        sum += sum * 0.18;
        console.log("\nThank you for using our service.");
        console.log(this.loggedUser.firstName, this.loggedUser.lastName);
        console.log("Amount payable is", 'Rs.' + sum);
        this.updateObj(this.loggedUser, checkOutDate, sum);
        this.loggedUser = null;
    }
    /**
     * Updating user data
     */
    updateObj = (obj, checkOutDate, sum) => {
        const userData = this.getJsonObj("D:/HotelManagement/json/userData.json");
        for (let user in userData) {
            if (userData[user].userkey === obj.userkey) {
                userData[user].firstName = obj.firstName;
                userData[user].lastName = obj.lastName;
                userData[user].phoneNo = obj.phoneNo;
                userData[user].email = obj.email;
                userData[user].durationOfStay = obj.durationOfStay;
                userData[user].checkInDate = obj.checkInDate;
                userData[user].checkOutDate = checkOutDate;
                userData[user].totalBill = sum;
                this.writeOrders(userData[user], "D:/HotelManagement/json/updatedUserData.json");
            }
        }
    }

    getJsonObj = (inputFile) => {
        let stringJson = fs.readFileSync(inputFile);
        let jsonObj = JSON.parse(stringJson);
        return jsonObj;
    };

    /**
     * json file to xlsx file
     */
    jsonToXlsx = (jsonFile, xlsxFile, sheetName) => {
        let jsonObj = this.getJsonObj(jsonFile);
        let workBook = JsonToXlsx.utils.book_new();
        let workSheet = JsonToXlsx.utils.json_to_sheet(jsonObj);
        JsonToXlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
        JsonToXlsx.writeFile(workBook, xlsxFile);
    };

}
exports.Operations = Operations;

