const router = require("express").Router();

const { verifyTokenAndAdmin } = require("./verifyToken");

const Product = require('../models/product/Product')
const Category = require("../models/product/Category");

const ProductImage = require('../models/product/ProductImage');
const ProductSize = require('../models/product/ProductSize');

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/add-category", verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log(req.body)
    const category = await Category.findByPk(req.body.idCategory);
    const product = await Product.findByPk(req.body.idProduct);
    
    await product.setCategories(category)

    res.status(200).json();
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.put("/change/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    const updatedProduct = await Product.findByPk(req.params.id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id, { 
      include: [
        {
          model: ProductImage,
          attributes: ['image'],
        },
        {
          model: ProductSize,
          attributes: ['size', 'quantity'],
        },
      ], } );
    res.status(200).json(product);

} catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find-all", async (req, res) => {
    try {

    const products = await Product.findAll( {   
      include: [
        {
          model: ProductImage,
          attributes: ['image'],
        },
        {
          model: ProductSize,
          attributes: ['size', 'quantity'],
        },
        {
          model: Category,
        },
      ], } );
    res.status(200).json(products);
    
} catch (err) {
  console.log(err)
    res.status(500).json(err);
  }
});

router.get("/:category", async (req, res) => {
    try {

    const products = await Category.findAll( {where: {title: req.params.category}, include: [Product] } );
    res.status(200).json(products);
    
} catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;