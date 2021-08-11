const Sequelize = require("sequelize");
const db = require("../db");

const OrderDetail = db.define("OrderDetail", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 0
    },
  },
});

const Order = db.define("Order", {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { Order, OrderDetail };
