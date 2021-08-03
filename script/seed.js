'use strict'

const {db, models: {User, Flower} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ email: 'nicky@plumeria.com', password: '123' , admin: true}),
    User.create({ email: 'caitlin@plumeria.com', password: '123' , admin: true }),
    User.create({ email: 'jazmin@plumeria.com', password: '123' , admin: true}),
    User.create({ email: 'kathleen@plumeria.com', password: '123' , admin: true}),
    User.create({ email: 'orlando@plumeria.com', password: '123' , admin: false}),
    User.create({ email: 'denesse@plumeria.com', password: '123' , admin: false})
  ])

  //Creating Flowers
  const flowers = await Promise.all([
    Flower.create({name: 'Plumeria', price: 10 , description: 'The most beautiful flower.', image: '' , color: 'pink' , quantity: 10}),
    Flower.create({name: 'Lily', price: 15 , description: 'The most small flower.', image: '' , color: 'white' , quantity: 20}),
    Flower.create({name: 'Wysteria', price: 20 , description: 'The most smelly flower.', image: '' , color: 'purple' , quantity: 8}),
    Flower.create({name: 'Hydrangea', price: 12 , description: 'The most tall flower.', image: '' , color: '' , quantity: 18})
  ])
}

  console.log(`seeded successfully O:)`)

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
