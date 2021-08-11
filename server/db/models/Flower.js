const Sequelize = require("sequelize");
const db = require("../db");

const Flower = db.define("flower", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "Under Construction",
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://mauiplumeriagardens.com/431-home_default/lei-rainbow-plumeria-cutting.jpg",
  },
  color: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Flower;
