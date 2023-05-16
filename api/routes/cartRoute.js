const router = require("express").Router();
const cartContoller = require("../controllers/CartController")

const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");


router.post("/", verifyToken, cartContoller.createCart);

router.purge("/:id", verifyTokenAndAuthorization, cartContoller.updateCart);

router.delete("/:id", verifyTokenAndAuthorization, cartContoller.deleteCart);

router.get("/find/:userId", verifyTokenAndAuthorization, cartContoller.getUserCart);

router.get("/", verifyTokenAndAdmin, cartContoller.getAllCarts);

module.exports = router;