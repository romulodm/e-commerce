const router = require("express").Router();

const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");

const { Product } = require('../models/product/Product')

router.post("/add", verifyTokenAndAdmin, async (req, res) => {});

router.put("/change/:id", verifyTokenAndAdmin, async (req, res) => {});

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {});

router.get("/find/:id", async (req, res) => {});

router.get("/find-all", async (req, res) => {});

router.get("/", async (req, res) => {});


module.exports = router;