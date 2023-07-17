const router = require("express").Router();

const { verifyTokenAndAdmin } = require("./verifyToken");

const Category  = require("../models/product/Category");
const Product = require("../models/product/Product");

const ProductImage = require("../models/product/ProductImage");
const ProductSize = require("../models/product/ProductSize");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Category.create({
        title: req.body.title
      });
        res.status(200).json("Category created!");
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message);
    }
});

router.post("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Category.destroy({
            where: {
              id: req.params.id
            }
          });
        res.status(200).json("Category has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/find-one/:id", async (req, res) => {
  try {

    const products = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          include: [
            {
              model: ProductImage,
              attributes: ['image'],
            },
            {
              model: ProductSize,
              attributes: ['size', 'quantity'],
            }
          ],
        },
      ],
    });
    
  res.status(200).json(products);
  
  } catch (err) {
    console.log(err)
    res.status(500).json(err);}
});


module.exports = router;