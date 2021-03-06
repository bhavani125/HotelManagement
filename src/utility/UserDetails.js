//Creating class
class UserDetails {
    firstName;
    lastName;
    phoneNo;
    email;
    userkey;
    durationOfStay;
    checkInDate;
    checkOutDate;
    totalBill;

    /**
     * Creating a constructor
     */
    constructor(firstName, lastName, phoneNo, email, userkey, durationOfStay, checkInDate, checkOutDate, totalBill) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.email = email;
        this.userkey = userkey;
        this.durationOfStay = durationOfStay;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.totalBill = totalBill;
    }

    /**
     * generating getters and setters and checking validation
     */
    get firstName() { return this.firstName; }

    set firstName(firstName) {
        let firstNameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (firstNameRegex.test(firstName)) {
            this.firstName = firstName;
        } else {
            throw 'Invalid name';
        }
    }
    get lastName() { return this.lastName; }

    set lastName(lastName) {
        let lastNameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (lastNameRegex.test(lastName)) {
            this.lastName = lastName;
        } else {
            throw 'Invalid name';
        }
    }

    get phoneNo() { return this.phoneNo; }
    set phoneNo(phoneNo) {
        let phoneNoRegex = RegExp('^[6-9]{1}[0-9]{9}$');
        if (phoneNoRegex.test(phoneNo)) {
            this.phoneNo = phoneNo;
        } else {
            throw 'Inva;lid phoneNumber';
        }
    }

    get email() { return this.email; }
    set email(email) {
        let emailRegex = RegExp('^[a-z\\+\\-\\_\\.a-z0-9]{3,}\\@[a-z]*\\.[a-z]{1,3}$');
        if (emailRegex.test(email)) {
            this.email = email;
        } else {
            throw 'Invalid email entry';
        }
    }

    get userkey() { return this.userkey; }
    set userkey(userkey) {
        this.userkey = userkey;
    }
    get durationOfStay() { return this.durationOfStay; }
    set durationOfStay(durationOfStay) {
        this.durationOfStay = durationOfStay;
    }
    get checkInDate() { return this.checkInDate; }
    set checkInDate(checkInDate) {
        this.checkInDate = checkInDate;
    }
    get checkOutDate() { return this.checkOutDate; }
    set checkOutDate(checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
    get totalBill() { return this.totalBill; }
    set totalBill(totalBill) {
        this.totalBill = totalBill;
    }
}
exports.UserDetails = UserDetails;