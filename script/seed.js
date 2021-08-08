"use strict";

const {
  db,
  models: { User, Flower, Order, OrderDetail },
} = require("../server/db");
// const { Order, OrderDetail } = require('../server/db/models/OrderDetail')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ email: "nicky@plumeria.com", password: "123", admin: true }),
    User.create({
      email: "caitlin@plumeria.com",
      password: "123",
      admin: true,
    }),
    User.create({ email: "jazmin@plumeria.com", password: "123", admin: true }),
    User.create({
      email: "kathleen@plumeria.com",
      password: "123",
      admin: true,
    }),
    User.create({
      email: "orlando@plumeria.com",
      password: "123",
      admin: false,
    }),
    User.create({
      email: "denesse@plumeria.com",
      password: "123",
      admin: false,
    }),
    User.create({
      email: "baby@plumeria.com",
      password: "123",
      admin: false,
    }),
    User.create({
      email: "jolene@plumeria.com",
      password: "123",
      admin: false,
    }),
  ]);

  const [nicky, caitlin, jazmin, kathleen, orlando, denesse] = users;

  //Creating Flowers
  const flowers = await Promise.all([
    Flower.create({
      name: "Plumeria",
      price: 1099,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio nec magna euismod venenatis facilisis at massa. Fusce fermentum nec lorem id volutpat.",
      image:
        "https://twistedtropicalnursery.com/wp-content/uploads/2019/08/20190815_064838-400x400.jpg",
      color: "pink",
      quantity: 10,
    }),
    Flower.create({
      name: "Lily",
      price: 1599,
      description:
        "Integer rutrum nisl aliquet porttitor sodales. Nulla facilisi. Ut convallis ex non eleifend aliquam. Sed commodo fermentum mauris et rhoncus. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/64379A.jpg",
      color: "red",
      quantity: 20,
    }),
    Flower.create({
      name: "Wysteria",
      price: 2099,
      description:
        "Duis bibendum lobortis tristique. Ut egestas, sem posuere fringilla tristique, erat elit egestas diam, at placerat eros sem vel enim.",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/75948A.jpg",
      color: "purple",
      quantity: 8,
    }),
    Flower.create({
      name: "Hydrangea",
      price: 1299,
      description:
        "Etiam varius rhoncus risus eget tempor. Pellentesque blandit mauris id velit mattis, vitae aliquam erat rutrum.",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/65694A.jpg",
      color: "multi",
      quantity: 18,
    }),
    Flower.create({
      name: "Lily of the Valley",
      price: 699,
      description:
        "Etiam at odio vitae nisi condimentum suscipit id sit amet est. Curabitur id cursus risus. Integer pharetra sem vitae condimentum ultricies.",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/07799A.jpg",
      color: "white",
      quantity: 18,
    }),
    Flower.create({
      name: "Meyer Lemon Tree",
      price: 1499,
      description:
        "Suspendisse blandit magna leo, rhoncus porta quam rutrum fermentum. Duis id dictum leo, id fermentum est. Sed ut odio nec magna euismod venenatis facilisis at massa.",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/62752A.jpg",
      color: "yellow",
      quantity: 18,
    }),
    Flower.create({
      name: "Tulip",
      price: 999,
      description:
        "Aliquam ante odio, gravida pellentesque ultrices quis, facilisis non velit. Sed lorem arcu, condimentum ut diam dictum, blandit facilisis dui. Nunc vitae nulla non mauris egestas pretium.",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/72599.jpg",
      color: "multi",
      quantity: 18,
    }),
    Flower.create({
      name: "Peony",
      price: 1199,
      description:
        "Cras id leo rutrum, porta arcu sit amet, lobortis dui. Donec pharetra consectetur libero, in rutrum metus mattis non. Sed ut odio nec magna euismod venenatis facilisis at massa.",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/02691A.jpg",
      color: "white",
      quantity: 18,
    }),
    Flower.create({
      name: "Rose",
      price: 1499,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/75391A.jpg",
      color: "orange",
      quantity: 18,
    }),
    ///////NEW ONES BELOW//////////////
    Flower.create({
      name: "Double Pink Peony",
      price: 1299,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/65582A.jpg",
      color: "pink",
      quantity: 18,
    }),
    Flower.create({
      name: "Festival Peony",
      price: 1399,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/75675A.jpg",
      color: "pink",
      quantity: 18,
    }),
    Flower.create({
      name: "Obsidian Iris",
      price: 1199,
      description:
        "Nullam commodo, justo prut sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/67247A.jpg",
      color: "purple",
      quantity: 18,
    }),
    Flower.create({
      name: "Hummingbird Mint",
      price: 1799,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/74219A.jpg",
      color: "orange",
      quantity: 18,
    }),
    Flower.create({
      name: "Berry Coneflower",
      price: 1099,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/78141A.jpg",
      color: "pink",
      quantity: 18,
    }),
    Flower.create({
      name: "Blue Gentian",
      price: 1499,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/65952A.jpg",
      color: "blue",
      quantity: 18,
    }),
    Flower.create({
      name: "Hyacinth",
      price: 1899,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/74912.jpg",
      color: "purple",
      quantity: 18,
    }),
    Flower.create({
      name: "Daylily",
      price: 999,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/66625A.jpg",
      color: "red",
      quantity: 18,
    }),
    Flower.create({
      name: "Rose Digitalis",
      price: 1499,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/64290A.jpg",
      color: "pink",
      quantity: 18,
    }),
    Flower.create({
      name: "Russian Sage",
      price: 1899,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/62428A.jpg",
      color: "purple",
      quantity: 18,
    }),
    Flower.create({
      name: "Amsonia",
      price: 2299,
      description:
        "Nullam commodo, justo at sollicitudin rhoncus, urna quam rutrum ex, vitae facilisis nulla mauris vitae velit. ",
      image:
        "https://h2.commercev3.net/cdn.springhillnursery.com/images/400/60745A.jpg",
      color: "blue",
      quantity: 18,
    }),
  ]);

  const [plumeria, lily, wysteria, hydrangea, lotv, lemon, tulip, peony, rose] =
    flowers;

  const orderDetails = await Promise.all([
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
    OrderDetail.create({ quantity: 2 }),
    OrderDetail.create({ quantity: 5 }),
    OrderDetail.create({ quantity: 10 }),
  ]);

  const [
    od1,
    od2,
    od3,
    od4,
    od5,
    od6,
    od7,
    od8,
    od9,
    od10,
    od11,
    od12,
    od13,
    od14,
    od15,
    od16,
    od17,
    od18,
    od19,
    od20,
    od21,
    od22,
    od23,
    od24,
    od25,
    od26,
    od27,
    od28,
    od29,
    od30,
    od31,
    od32,
    od33,
    od34,
    od35,
    od36,
  ] = orderDetails;

  const orders = await Promise.all([
    Order.create({}),
    Order.create({}),
    Order.create({ completed: true }),
    Order.create({}),
    Order.create({ completed: true }),
    Order.create({ completed: true }),
    Order.create({ completed: true }),
    Order.create({}),
    Order.create({ completed: true }),
    Order.create({}),
    Order.create({ completed: true }),
    Order.create({}),
  ]);

  const [
    order1,
    order2,
    order3,
    order4,
    order5,
    order6,
    order7,
    order8,
    order9,
    order10,
    order11,
    order12,
  ] = orders;
  //Order 1////////////////////
  await plumeria.addOrderDetail(od1);
  await order1.addOrderDetail(od1);
  await nicky.addOrder(order1);

  await lily.addOrderDetail(od2);
  await order1.addOrderDetail(od2);
  await nicky.addOrder(order1);
  //Order 2////////////////////////
  await wysteria.addOrderDetail(od3);
  await order2.addOrderDetail(od3);
  await orlando.addOrder(order2);

  await hydrangea.addOrderDetail(od4);
  await order2.addOrderDetail(od4);
  await orlando.addOrder(order2);
  //Order 3/////////////////////
  await lotv.addOrderDetail(od5);
  await order3.addOrderDetail(od5);
  await caitlin.addOrder(order3);
  //Order 4////////////////////
  await lemon.addOrderDetail(od6);
  await order4.addOrderDetail(od6);
  await jazmin.addOrder(order4);

  await tulip.addOrderDetail(od7);
  await order4.addOrderDetail(od7);
  await jazmin.addOrder(order4);

  await peony.addOrderDetail(od8);
  await order4.addOrderDetail(od8);
  await jazmin.addOrder(order4);
  //Order 5//////////////////
  await rose.addOrderDetail(od9);
  await order5.addOrderDetail(od9);
  await jazmin.addOrder(order5);
  //Order 6/////////////////////////
  await plumeria.addOrderDetail(od10);
  await order6.addOrderDetail(od10);
  await kathleen.addOrder(order6);

  await lily.addOrderDetail(od11);
  await order6.addOrderDetail(od11);
  await kathleen.addOrder(order6);

  await wysteria.addOrderDetail(od12);
  await order6.addOrderDetail(od12);
  await kathleen.addOrder(order6);
  //Order 7/////////////////
  await hydrangea.addOrderDetail(od13);
  await order7.addOrderDetail(od13);
  await caitlin.addOrder(order7);

  await lotv.addOrderDetail(od14);
  await order7.addOrderDetail(od14);
  await caitlin.addOrder(order7);

  await lemon.addOrderDetail(od15);
  await order7.addOrderDetail(od15);
  await caitlin.addOrder(order7);

  await tulip.addOrderDetail(od16);
  await order7.addOrderDetail(od16);
  await caitlin.addOrder(order7);

  await peony.addOrderDetail(od17);
  await order7.addOrderDetail(od17);
  await caitlin.addOrder(order7);

  await rose.addOrderDetail(od18);
  await order7.addOrderDetail(od18);
  await caitlin.addOrder(order7);
  //Order 8/////////////////////
  await plumeria.addOrderDetail(od19);
  await order8.addOrderDetail(od19);
  await denesse.addOrder(order8);

  await lily.addOrderDetail(od20);
  await order8.addOrderDetail(od20);
  await denesse.addOrder(order8);

  await wysteria.addOrderDetail(od21);
  await order8.addOrderDetail(od21);
  await denesse.addOrder(order8);
  //Order 9//////////////////////
  await hydrangea.addOrderDetail(od22);
  await order9.addOrderDetail(od22);
  await nicky.addOrder(order9);

  await lotv.addOrderDetail(od23);
  await order9.addOrderDetail(od23);
  await nicky.addOrder(order9);

  await lemon.addOrderDetail(od24);
  await order9.addOrderDetail(od24);
  await nicky.addOrder(order9);
  //Order 10//////////////////////
  await tulip.addOrderDetail(od25);
  await order10.addOrderDetail(od25);
  await kathleen.addOrder(order10);

  await peony.addOrderDetail(od26);
  await order10.addOrderDetail(od26);
  await kathleen.addOrder(order10);

  await rose.addOrderDetail(od27);
  await order10.addOrderDetail(od27);
  await kathleen.addOrder(order10);
  //Order 11////////////////////////
  await plumeria.addOrderDetail(od28);
  await order11.addOrderDetail(od28);
  await jazmin.addOrder(order11);

  await lily.addOrderDetail(od29);
  await order11.addOrderDetail(od29);
  await jazmin.addOrder(order11);

  await wysteria.addOrderDetail(od30);
  await order11.addOrderDetail(od30);
  await jazmin.addOrder(order11);
  //Order 12//////////////////////
  await hydrangea.addOrderDetail(od31);
  await order12.addOrderDetail(od31);
  await caitlin.addOrder(order12);

  await lotv.addOrderDetail(od32);
  await order12.addOrderDetail(od32);
  await caitlin.addOrder(order12);

  await lemon.addOrderDetail(od33);
  await order12.addOrderDetail(od33);
  await caitlin.addOrder(order12);

  await tulip.addOrderDetail(od34);
  await order12.addOrderDetail(od34);
  await caitlin.addOrder(order12);

  await peony.addOrderDetail(od35);
  await order12.addOrderDetail(od35);
  await caitlin.addOrder(order12);

  await rose.addOrderDetail(od36);
  await order12.addOrderDetail(od36);
  await caitlin.addOrder(order12);
}

console.log(`seeded successfully O:)`);

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
