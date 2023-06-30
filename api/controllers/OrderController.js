const OrderService = require("../services/OrderService")

module.exports = {
    createOrder: async (req, res) => {
        let json = {error:'', result:{}};
        
        const orderInfos = req.body;

        try {
            const savedOrder = await OrderService.createOrder(orderInfos);
            
            json.result = savedOrder
            res.status(200).json(json);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateOrder: async (req, res) => {
        try {
            if(req.body.products) {
                var updatedOrder = await OrderService.updateOrder(req.body.id,req.body.products,req.body.quantity)
            }

            res.status(200).json(updatedOrder);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    deleteOrder: async (req, res) => {
        try {
            await OrderService.deleteOrder(req.params.id);
            res.status(200).json("Order has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
    },

    getUserOrder: async (req, res) => {
        try {
            const order = await OrderService.getUserOrder(req.params.userId);
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await OrderService.getAllOrders();
            //console.log(products)
            res.status(200).json(orders);
          } catch (err) {
            res.status(500).json(err);
          }
    }
}
