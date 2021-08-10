const router = require('express').Router()
const { models: { User, Order, Flower }} = require('../db')
const { OrderDetail } = require('../db/models/OrderDetail')
const {requireToken} = require('./gatekeepingMiddleware')
module.exports = router
//------USER ROUTES. NOT CURRENTLY IN USE-------
// //get all users:
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

// //create/post 1 user:
// router.post('/', async(req, res, next) => {
//   try {
//     res.status(201).send(await User.create(req.body));
//   } catch (err){
//       next(err)
//   }
// })

// //get 1 user:
// router.get('/:userId', async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         id: req.params.userId
//       },
//       include: Order
//     })
//     res.json(user)
//   }
//   catch (error) {
//     next(error)
//   }
// })


//EVERYTHING AHEAD OF YOU WILL NOW BE ACCESSED VIA */api/cart* (unless you want to change it)


//api/cart , return false orders
router.get('/', requireToken, async (req, res, next) => {
  try {
    const user = req.user; // this returns the user from middleware
    const order = await Order.findAll({
      where: {
        completed: false,
        userId: user
      },
      include: OrderDetail
    })
    res.json(order)
  }
  catch (error) {
    next(error)
  }
})

//do we need user id here? should we need user id here? big security question... 
router.delete('/:orderDetailId', async (req, res, next) => {
  const orderDetailId = req.params.orderDetailId
  // const user = req.user;
  try {
  const removeItem =  await OrderDetail.findByPk(orderDetailId);
  await removeItem.destroy();
  res.send(removeItem)
  } catch (error) {
    next(error)
  }
})


//case if: no order & no order detail: ADD CART
router.post('/:flowerId/:quantity', requireToken, async (req, res, next) => {
  try{
    const user = req.user; //need user from middleware to create the associations
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

//case if: order exists but no order detail: ADDTOORDER
router.post(':OrderId/:flowerId/:quantity', async (req, res, next) => {
  try{
    const order = await Order.findByPk(req.params.OrderId)
    const flower = await Flower.findByPk(req.params.flowerId)
    const quantity = req.params.quantity

    const newOrderDetail = await OrderDetail.create({quantity})
    // await user.addOrder(newOrder)
    await order.addOrderDetail(newOrderDetail)

    const orderDetail = await OrderDetail.findByPk(newOrderDetail.id)
    await flower.addOrderDetail(orderDetail)
    

    res.send(newOrderDetail)
  }
  catch(err){next(err)}
})

//case if: order exists & order detail exists: UPDATEFLOWER
router.put('/:OrderId/:OrderDetailId/:quantity', async (req, res, next) => {
  try{
    const orderDetail = await OrderDetail.findByPk(req.params.OrderDetailId)
    const quantity = req.params.quantity
    await orderDetail.update({quantity})
    const order = await Order.findByPk(req.params.OrderId)
    res.send(order)
    
  }
  catch(err){next(err)}
})


