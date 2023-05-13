const AuthService = require("../services/AuthService")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    registerUser: async(req, res) => {
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString()
          };
        
          try {
            const savedUser = await AuthService.registerUser(newUser);
            res.status(201).json(savedUser);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    loginUser: async (req, res) => {
        try{
            let json = {error:'', result:{}}

            const user = await AuthService.findUser(req.body.username);
    
            if (!user) {
                console.log("entrei")
                json.error = "Invalid credentials!"
                return res.status(401).json({json});
              }

            const hashedPassword = CryptoJS.AES.decrypt(user.Password, process.env.PASS_SEC);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            if (originalPassword !== req.body.password) {
                json.error = "Wrong password!"
                return res.status(401).json({json});
              }
    
            const accessToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
            );

            const { password, ...others } = user;  
                  
            json.result = { ...others, accessToken };
            res.status(200).json({json})
            
        }catch(error){
            res.status(500).json(error);
        }
    }

}