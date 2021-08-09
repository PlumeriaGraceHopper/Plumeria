const router = require('express').Router()
const { models: { User, Order, Flower }} = require('../db')
const { OrderDetail } = require('../db/models/OrderDetail')
module.exports = router

//get all users:
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//create/post 1 user:
router.post('/', async(req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (err){
      next(err)
  }
})

//get 1 user:
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: Order
    })
    res.json(user)
  }
  catch (error) {
    next(error)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        completed: false,
        userId: req.params.userId
      },
      include: OrderDetail
    })
    res.json(order)
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:orderDetailId', async (req, res, next) => {
  const orderDetailId = req.params.orderDetailId

  console.log(orderDetailId)
  try {
  const removeItem =  await OrderDetail.findByPk(orderDetailId);
  await removeItem.destroy();
  res.send(removeItem)
  } catch (error) {
    next(error)
  }
})

//CART PLAN: 
// magic methods are: 

//flower.addOrderDetail({orderDetail we've created})
//ordernumber.addOrderDetail({orderDetail we've created})
//user.addOrder({ordernumber of the current order})

//This all happens when we click the Add To Cart button: 

//Needs to know if it's adding to an existing order or if it needs to create a new Order
//if order doesn't exists, we need to create the order and use magic method to associate with user 
//if it does, checks state and sees that there's an order, and then adds to that order
//create order detail
//checks cart if order detail already has flower ID, if yes, updates quantity, if no, adds new order detail
//if adding new order detail, need to associate with flower, and with order 

//case if: no order & no order detail:
router.post('/:userId/:flowerId/:quantity', async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const flower = await Flower.findByPk(req.params.flowerId)
    const quantity = req.params.quantity

    const newOrder = await Order.create()
    const newOrderDetail = await OrderDetail.create({quantity})

    await user.addOrder(newOrder) 
    await newOrder.addOrderDetail(newOrderDetail)
    await flower.addOrderDetail(newOrderDetail)

    res.send(newOrder)
  }
  catch(err){next(err)}
})

//case if: order exists but no order detail:
//order exists in state (with order details in cart)
router.post('/:userId/:OrderId/:flowerId/:quantity', async (req, res, next) => {
  try{
    const order = await Order.findByPk(req.params.OrderId)
    const flower = await Flower.findByPk(req.params.flowerId)
    const quantity = req.params.quantity

    const newOrderDetail = await OrderDetail.create({quantity})

    // await user.addOrder(newOrder)
    await order.addOrderDetail(newOrderDetail)
    await flower.adOrderDetail(newOrderDetail)
    

    res.send(newOrderDetail)
  }
  catch(err){next(err)}
})

//case if: order exists & order detail exists:
//update quantity of flowers:
router.put('/:userId/:OrderId/:OrderDetailId/:quantity', async (req, res, next) => {
  try{
    const orderDetail = await OrderDetail.findByPk(req.params.OrderDetailId)
    const quantity = req.params.quantity
    await orderDetail.update({quantity})
    const order = await Order.findByPk(req.params.OrderId)
    res.send(order)
    
  }
  catch(err){next(err)}
})


