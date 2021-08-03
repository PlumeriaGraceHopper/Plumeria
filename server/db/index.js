//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')

const Flower = require('./models/Flower')

User.belongsToMany(Flower, {through:'usersflowers'});
Flower.belongsToMany(User, {through:'usersflowers'});

module.exports = {
  db,
  models: {
    User,
    Flower
  },
}
