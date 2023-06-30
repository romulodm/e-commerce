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
            await AuthService.registerUser(newUser);
            res.status(201).json("Successfully registered user!");
          } catch (err) {
            res.status(500).json(err);
          }
    },

    loginUser: async (req, res) => {
        try{

          const user = await AuthService.findUser(req.body.email);
  
          if (!user) {
              return res.status(401).json("Invalid credentials!");
            }

          const hashedPassword = CryptoJS.AES.decrypt(user.Password, process.env.PASS_SEC);
          const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

          if (originalPassword !== req.body.password) {
              return res.status(404).json("Wrong password!");
            }

  
          const accessToken = jwt.sign(
          {
              id: user.id,
              isAdmin: user.isAdmin,
          },
              process.env.JWT_SEC,
              {expiresIn:"3d"}
          );

          const userJson = JSON.parse(JSON.stringify(user));
          const { Password, ...others } = userJson;

          res.status(200).json({ ...others, accessToken });

        }catch(error){
            res.status(500).json(error);
        }
    },

    checkEmail: async (req, res) => {
      try{
          const email = await AuthService.findUser(req.body.email);
          if (email) {
            return res.status(404).json();
          }  
          res.status(200).json();
        } catch (err) {
          res.status(500).json(err);
        }      
  },

}