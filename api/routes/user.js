const router = require("express").Router();
const UserController = require("../controllers/UserController")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");


//Update:
router.put("/:id", verifyTokenAndAuthorization, UserController.modifyUser);

//Delete:
router.delete("/:id", verifyTokenAndAuthorization, UserController.deleteUser)
//Get one user:
router.get("/find/:id", verifyTokenAndAdmin, UserController.getUser)
//Get all users:
router.get("/find-all", verifyTokenAndAdmin, UserController.getAllUsers) 

module.exports = router;