const router = require('express').Router()
const { models: { User, Order }} = require('../db')
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