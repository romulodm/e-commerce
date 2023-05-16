const router = require("express").Router();
const orderContoller = require("../controllers/OrderController")

const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");


router.post("/", verifyToken, orderContoller.createOrder);

router.purge("/:id", verifyTokenAndAdmin, orderContoller.updateOrder);

router.delete("/:id", verifyTokenAndAdmin, orderContoller.deleteOrder);

router.get("/find/:userId", verifyTokenAndAdmin, orderContoller.getUserOrder);

router.get("/", verifyTokenAndAdmin, orderContoller.getAllOrder);

module.exports = router;