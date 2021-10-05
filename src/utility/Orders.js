class Orders {
  userkey;
  item;
  quantity;
  price;
  totalAmount;

  constructor(userkey, item, quantity, price, totalAmount) {
    this.userkey = userkey;
    this.item = item;
    this.quantity = quantity;
    this.price = price;
    this.totalAmount = totalAmount;
  }
}
module.exports = Orders;
