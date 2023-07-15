const router = require("express").Router();

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/User")

router.post("/register", async (req, res) => {
    try {

        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
            ).toString()
        };

        await User.create(newUser)

        res.status(201).json();
      } catch (err) {
        res.status(500).json(err);
      }

});

router.post('/login', async (req, res) => {
    try{

        const user = await User.findOne({ where: { email: req.body.email }  });
        if (!user) {
            return res.status(201).json();
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(201).json("Wrong password!");
        }

        const accessToken = jwt.sign(
        {
            id: user.id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        const userJson = JSON.parse(JSON.stringify(user.dataValues));
        const { password, ...others } = userJson;

        res.status(200).json({ ...others, accessToken });
    
    } catch(error){
        res.status(500).json(error);
    }

});

router.post("/check-email", async (req, res) => {
    try{
        const email = await User.findOne({ where: { email: req.body.email }  });
        if (email) {
            return res.status(404).json();
        }
        res.status(200).json();

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
       
});

router.post("/reset-password", async (req, res) => {
    try {
        if(req.body.password) {
            var encryptedPassword = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString();
        }

        let updatedUser = await User.update(
            { password: encryptedPassword },
            { where: { email: req.body.email } }
          );

        if (updatedUser) {
          res.status(200).json("Password reseted!");
        }
      } catch (err) {
        res.status(500).json(err);
      } 
    });

module.exports = router;