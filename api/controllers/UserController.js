const UserService = require("../services/UserService")
const CryptoJS = require("crypto-js");

module.exports = {
  modifyUser: async(req, res) => {
    let json = {error:'', result:{}}
 
    try {
      if(req.body.username) {
        var updatedUser = await UserService.modifyUsername(req.params.id,req.body.username)
      }
      if(req.body.password) {
          req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      
        var updatedUser = await UserService.modifyPassword(req.params.id, req.body.password)
      }
      if(req.body.email) {
        var updatedUser = await UserService.modifyEmail(req.params.id, req.body.email)
      }

      json.result = updatedUser

      res.status(200).json(json);
    
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async(req,res) =>{
    try {
      let json = {error:'', result:{}}

      await UserService.deleteUser(req.params.id);
      
      json.result = "User has been deleted..."
      res.status(200).json(json);
    
    } catch (error) {
      res.status(500).json(error);
    }

  },

  getUser: async(req,res) =>{
    try {
      let json = {error:'', result:{}}

      user = await UserService.getUser(req.params.id);

      const { password, ...others } = user;
      json.result = others
      res.status(200).json(json);

    } catch (error) {
      res.status(500).json(error);
    }

  },

  getAllUsers: async(req,res) =>{
    try {
      let json = {error:'', result:{}}

      user = await UserService.getAllUsers(req.params.id);

      const { password, ...others } = user;
      json.result = others
      res.status(200).json(json);

    } catch (error) {
      res.status(500).json(error);
    }

  }

}
