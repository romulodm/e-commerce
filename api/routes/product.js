const router = require("express").Router();
const ProductController = require("../controllers/ProductController")
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");


router.post("/add", verifyTokenAndAdmin, ProductController.createProduct)

router.put("/change/:id", verifyTokenAndAdmin, ProductController.updateProduct)

router.delete("/delete/:id", verifyTokenAndAdmin, ProductController.deleteProduct)

router.get("/find/:id", ProductController.getProduct)

router.get("/find-all", ProductController.getAllProducts)


module.exports = router;