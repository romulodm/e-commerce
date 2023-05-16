const DB = require("../db")

module.exports = {
    createOrder: (orderInfos) => {
        return new Promise((acepted, rejected) => {
            DB.query('INSERT INTO orders (user_id, products, quantity) VALUES (?, JSON_ARRAY(?), JSON_ARRAY(?))', 

            [orderInfos.user_id, orderInfos.products, orderInfos.quantity], (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                acepted(results.insertCodigo);

            })
        });
    },

    updateOrder: (id, products, quantity) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE orders SET products=? quantity=? WHERE user_id=?', 
            
            [products, quantity, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    deleteOrder: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('DELETE FROM orders WHERE user_id=?', [id], (error,results) =>{
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            });
        });
    },

    getUserOrder: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM orders WHERE user_id=?', [id], (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                if(results.length > 0){
                    acepted(results[0]);
                }
                else{
                    acepted(false);
                }
            })
        });
    },

    getAllOrders: () => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM orders', (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                if(results.length > 0){
                    const decodedResponse = results.map((item) => {
                        item.Products = JSON.parse(item.Sizes.replace(/\\/g, ''));
                        item.Quantity = JSON.parse(item.Quantity.replace(/\\/g, ''));
                        return item
                    });

                    acepted(decodedResponse);
                }
            })
        });
    }
}