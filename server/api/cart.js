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


//EVERYTHING AHEAD OF YOU WILL NOW BE ACCESSED VIA */api/cart* 


//api/cart , return false orders
router.get('/', requireToken, async (req, res, next) => {
  try {
    console.log("API/CART CHECKKKKK")
    const userId = req.user.id; // this returns the user from middleware
    const order = await Order.findOne({
      where: {
        completed: false,
        userId: userId
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
router.delete('/:orderDetailId', requireToken, async (req, res, next) => {
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
router.post('/:OrderId/:flowerId/:quantity', requireToken, async (req, res, next) => {
  try{
    const user = req.user
    const order = await Order.findByPk(req.params.OrderId)
    const flower = await Flower.findByPk(req.params.flowerId)
    const quantity = req.params.quantity

    console.log("IN POST ORDER", order,flower,quantity);

    const newOrderDetail = await OrderDetail.create({quantity})
    // await user.addOrder(newOrder)
    await order.addOrderDetail(newOrderDetail)

    const orderDetail = await OrderDetail.findByPk(newOrderDetail.id)
    await flower.addOrderDetail(orderDetail)
    
    console.log("SENDING ORDER DETAIL", newOrderDetail)

    res.send(newOrderDetail)
  }
  catch(err){next(err)}
})

//case if: order exists & order detail exists: UPDATEFLOWER
router.put('/:OrderDetail/:quantity', requireToken, async (req, res, next) => {
  try{
    const quantity = req.params.quantity
    const orderDetailId = req.params.OrderDetail
    const orderDetail = await OrderDetail.findByPk(orderDetailId)
    await orderDetail.update({quantity})
    res.send(orderDetail)
  }
  catch(err){next(err)}
})


