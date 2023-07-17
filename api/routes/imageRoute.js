const router = require("express").Router();

const { verifyTokenAndAdmin } = require("./verifyToken");

const ProductImage = require('../models/product/ProductImage');

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
    try {
  
      const newImage = await ProductImage.create({
        image: req.body.image,
        idProduct: req.body.idProduct,
      });
  
      res.status(201).json(newImage);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

router.post("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await ProductImage.destroy({
            where: {
              id: req.params.id
            }
          });
        res.status(200).json("Image has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});



module.exports = router;