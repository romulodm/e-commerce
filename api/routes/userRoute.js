const router = require("express").Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const { User } = require('../models/User')


router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        let deletedUser = await User.destroy({ where: { id: req.params.id } });

        if (deletedUser) {
            return res.status(200).json();
        }
      } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
  
        const { password, ...others } = user.toJSON();
        res.status(200).json(others);
  
      } catch (error) {
        res.status(500).json(error);
      }
})

router.get("/find-all", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.findAll();
  
        const sanitizedUsers = users.map(user => {
            const { password, ...others } = user.toJSON();
            return others;
        });

        res.status(200).json(sanitizedUsers);
  
      } catch (error) {
        res.status(500).json(error);
      }
}) 

module.exports = router;