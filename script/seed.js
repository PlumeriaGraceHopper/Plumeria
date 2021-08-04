'use strict'

const {db, models: {User, Flower, Order, OrderDetail} } = require('../server/db')
// const { Order, OrderDetail } = require('../server/db/models/OrderDetail')

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

  const [nicky, caitlin, jazmin, kathleen, orlando, denesse] = users;

  //Creating Flowers
  const flowers = await Promise.all([
    Flower.create({name: 'Plumeria', price: 10 , description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio nec magna euismod venenatis facilisis at massa. Fusce fermentum nec lorem id volutpat.', image: "https://twistedtropicalnursery.com/wp-content/uploads/2019/08/20190815_064838-400x400.jpg" , color: 'pink' , quantity: 10}),
    Flower.create({name: 'Lily', price: 15 , description: 'Integer rutrum nisl aliquet porttitor sodales. Nulla facilisi. Ut convallis ex non eleifend aliquam. Sed commodo fermentum mauris et rhoncus. ', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/64379A.jpg" , color: 'red' , quantity: 20}),
    Flower.create({name: 'Wysteria', price: 20 , description: 'Duis bibendum lobortis tristique. Ut egestas, sem posuere fringilla tristique, erat elit egestas diam, at placerat eros sem vel enim.', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/75948A.jpg" , color: 'purple' , quantity: 8}),
    Flower.create({name: 'Hydrangea', price: 12 , description: 'Etiam varius rhoncus risus eget tempor. Pellentesque blandit mauris id velit mattis, vitae aliquam erat rutrum.', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/65694A.jpg", color: 'multi' , quantity: 18}),
    Flower.create({name: 'Lily of the Valley', price: 6 , description: 'Etiam at odio vitae nisi condimentum suscipit id sit amet est. Curabitur id cursus risus. Integer pharetra sem vitae condimentum ultricies.', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/07799A.jpg", color: 'white' , quantity: 18}),
    Flower.create({name: 'Meyer Lemon Tree', price: 14 , description: 'Suspendisse blandit magna leo, rhoncus porta quam rutrum fermentum. Duis id dictum leo, id fermentum est. Sed ut odio nec magna euismod venenatis facilisis at massa.', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/62752A.jpg", color: 'yellow' , quantity: 18}),
    Flower.create({name: 'Tulip', price: 9 , description: 'Aliquam ante odio, gravida pellentesque ultrices quis, facilisis non velit. Sed lorem arcu, condimentum ut diam dictum, blandit facilisis dui. Nunc vitae nulla non mauris egestas pretium.', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/72599.jpg", color: 'multi' , quantity: 18}),
    Flower.create({name: 'Peony', price: 11 , description: 'Cras id leo rutrum, porta arcu sit amet, lobortis dui. Donec pharetra consectetur libero, in rutrum metus mattis non. Sed ut odio nec magna euismod venenatis facilisis at massa.', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/02691A.jpg", color: 'white' , quantity: 18}),
    Flower.create({name: 'Rose', price: 14 , description: 'Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ', image: "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/75391A.jpg", color: 'orange' , quantity: 18}),
  ])

  const [plumeria, lily, wysteria, hydrangea] = flowers; 

  const orderDetails = await Promise.all([
    OrderDetail.create({quantity: 2}),
    OrderDetail.create({quantity: 5}),
    OrderDetail.create({quantity: 10})
  ])

  const [ orderDetail1, orderDetail2, orderDetail3 ] = orderDetails

  const orders = await Promise.all([
    Order.create({}),
    Order.create({})
  ])

  const [order1, order2 ] = orders

  await plumeria.addOrderDetail(orderDetail1);
  await order1.addOrderDetail(orderDetail1);
  await nicky.addOrder(order1);

  await lily.addOrderDetail(orderDetail2);
  await order1.addOrderDetail(orderDetail2);
  await nicky.addOrder(order1);

  await wysteria.addOrderDetail(orderDetail3);
  await order2.addOrderDetail(orderDetail3);
  await orlando.addOrder(order2);

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
