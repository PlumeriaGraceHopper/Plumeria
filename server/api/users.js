const router = require('express').Router()
const { models: { User, Order, Flower }} = require('../db')
const { OrderDetail } = require('../db/models/OrderDetail')
module.exports = router

// o: no admin check
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

// o: you can get cart from req.user
router.get('/:userId/cart', async (req, res, next) => {
  try {
    // o: should be orders
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

  try {
    // o: indentation is important, you can do a destroy in one query
  const removeItem =  await OrderDetail.findByPk(orderDetailId);
  await removeItem.destroy();
  res.send(removeItem)
  } catch (error) {
    next(error)
  }
})


// o: can get userId from req.user, quantity should be sent via body
//case if: no order & no order detail:
router.post('/:userId/:flowerId/:quantity', async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const flower = await Flower.findByPk(req.params.flowerId)
    const quantity = req.params.quantity

    const newOrder = await Order.create()

    // o: what about when quantity is -, or NaN
    const newOrderDetail = await OrderDetail.create({quantity})

    // o: I am confused about this logic
    await user.addOrder(newOrder) 
    await newOrder.addOrderDetail(newOrderDetail)
    await flower.addOrderDetail(newOrderDetail)

    // await OrderDetail.create({
    //   orderId: newOrder.id,
    //   floderId: flower.id,
    //   quantity: quantity
    // })

    res.send(newOrder)
  }
  catch(err){next(err)}
})

// o: can get userId from req.user, quantity should be sent via body, why capital?
//case if: order exists but no order detail:
//order exists in state (with order details in cart)
router.post('/:userId/:OrderId/:flowerId/:quantity', async (req, res, next) => {
  try{
    const order = await Order.findByPk(req.params.OrderId)
    const flower = await Flower.findByPk(req.params.flowerId)
    const quantity = req.params.quantity

    // o: what about when quantity is -, or NaN
    const newOrderDetail = await OrderDetail.create({quantity})
    // await user.addOrder(newOrder)
    await order.addOrderDetail(newOrderDetail)

    // o: what if you don't find OrderDetail
    const orderDetail = await OrderDetail.findByPk(newOrderDetail.id)
    await flower.addOrderDetail(orderDetail)
    

    res.send(newOrderDetail)
  }
  catch(err){next(err)}
})

// o: can get userId from req.user, why do you need to send OrderId, quantity should be sent via body, why capital?
//case if: order exists & order detail exists:
//update quantity of flowers:
router.put('/:userId/:OrderId/:OrderDetailId/:quantity', async (req, res, next) => {
  try{
    const orderDetail = await OrderDetail.findByPk(req.params.OrderDetailId)
    const quantity = req.params.quantity
    await orderDetail.update({quantity})

    // o: what if you don't find Order
    const order = await Order.findByPk(req.params.OrderId)
    res.send(order)
    
  }
  catch(err){next(err)}
})


