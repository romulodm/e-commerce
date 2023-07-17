const router = require("express").Router();

const { verifyTokenAndAdmin } = require("./verifyToken");

const  Supplier = require("../models/product/Supplier");
const  Product = require("../models/product/Product");


router.post("/add", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Supplier.create({
        title: req.body.title,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
      });
        res.status(200).json("Supplier created!");
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message);
    }
});

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Supplier.destroy({
            where: {
              id: req.params.id
            }
          });
        res.status(200).json("Supplier has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/products/:id', async (req, res) => {
try {
    const supplierId = req.params.id;

    const products = await Supplier.findAll({
        where: {
          id: supplierId, 
        },
        include: {
          model: Product, 
        },
      });

    res.status(200).json(products);
} catch (err) {
    res.status(500).json(err);
}
});

router.put('/change/:id', async (req, res) => {
    try {
        await Supplier.update(req.body, {
            where: {
              id: req.params.id
            }
          });
        
        res.status(200).json();
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;