const CartService = require("../services/CartService")


module.exports = {
    createCart: async (req, res) => {
        let json = {error:'', result:{}};
        
        const cartInfos = req.body;

        try {
            const savedCart = await CartService.createCart(cartInfos);
            
            json.result = savedCart
            res.status(200).json(json);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateCart: async (req, res) => {
        try {
            if(req.body.products) {
                var updatedCart = await CartService.updateCart(req.body.id,req.body.products,req.body.quantity)
            }

            res.status(200).json(updatedCart);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    deleteCart: async (req, res) => {
        try {
            await CartService.deleteCart(req.params.id);
            res.status(200).json("Cart has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
    },

    getUserCart: async (req, res) => {
        try {
            const cart = await CartService.getUserCart(req.params.userId);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllCarts: async (req, res) => {
        try {
            const carts = await CartService.getAllCarts();
            //console.log(products)
            res.status(200).json(products);
          } catch (err) {
            res.status(500).json(err);
          }
    }
}
