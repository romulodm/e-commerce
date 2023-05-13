const UserService = require("../services/UserService")

module.exports = {
  modifyUser: async(req, res) => {
    if (req.body.password) {
        
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }
    
      try {
        const updatedUser = await UserService.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
}
