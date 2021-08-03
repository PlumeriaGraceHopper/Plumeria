const Sequelize = require('sequelize')
const db = require('../db')


const Flower = db.define('flower', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "Under Construction"
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: "tbd.com"
  },
  color:{
    type: Sequelize.STRING
  },
  quantity:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Flower