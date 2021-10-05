const assert = require('chai').assert;
const utility = require('../utility/Operations');

describe('app', function () {
    describe('generateUniqueKey()', function () {
        it('generateUniqueKey should return valid key', function () {
            let result = utility.generateUniqueKey('Bhavani', '9989464121');
            assert.equal(result, 'Bhav9989');
        });
    });

    describe('getUserObj', function () {
        it('getUserObj should return correct user object', function () {
            let result = utility.getUserObj('Bhavani', 'Bhav9989', "D:/HotelManagement/json/userData.json");
            assert.typeOf(result, 'object');
        });
    });

});
