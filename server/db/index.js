//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Flower = require("./models/Flower");

const { Order, OrderDetail } = require("./models/OrderDetail");

User.hasMany(Order);
Order.hasMany(OrderDetail);
Flower.hasMany(OrderDetail);

module.exports = {
  db,
  models: {
    User,
    Flower,
    Order,
    OrderDetail,
  },
};
