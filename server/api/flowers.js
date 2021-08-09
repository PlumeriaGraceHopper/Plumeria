const router = require("express").Router();
const {
  models: { Flower },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const flowers = await Flower.findAll();
    res.json(flowers);
  } catch (err) {
    next(err);
  }
});

router.get("/:flowerId", async (req, res, next) => {
  try {
    // o: need to check for when you can't find a flower
    const flower = await Flower.findByPk(req.params.flowerId);
   res.json(flower); 
  } catch (err) {
    next(err);
  }
});
