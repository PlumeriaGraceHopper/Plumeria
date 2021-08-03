const router = require('express').Router()
const { models: { Flower }} = require('../db')

module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const flowers = await Flower.findAll()
      res.json(flowers)
    } catch (err) {
      next(err)
    }
  })

  