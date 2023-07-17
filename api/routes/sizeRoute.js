const router = require("express").Router();

const { verifyTokenAndAdmin } = require("./verifyToken");

const ProductSize = require('../models/product/ProductSize')

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
    try {
      const newSize = await ProductSize.create({
        size: req.body.size,
        quantity: req.body.quantity,
        idProduct: req.body.idProduct, 
      });
  
      res.status(201).json(newSize);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await ProductSize.destroy({
            where: {
              id: req.params.id
            }
          });
        res.status(200).json("Size has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;