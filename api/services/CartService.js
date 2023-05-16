const DB = require("../db")

module.exports = {
    createCart: (cartInfos) => {
        return new Promise((acepted, rejected) => {
            DB.query('INSERT INTO cart (user_id, products, quantity) VALUES (?, JSON_ARRAY(?), JSON_ARRAY(?))', 

            [cartInfos.user_id, cartInfos.products, cartInfos.quantity], (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                acepted(results.insertCodigo);

            })
        });
    },

    updateCart: (id, products, quantity) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE cart SET products=? quantity=? WHERE user_id=?', 
            
            [products, quantity, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    deleteCart: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('DELETE FROM cart WHERE user_id=?', [id], (error,results) =>{
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            });
        });
    },

    getUserCart: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM cart WHERE user_id = ?', [id], (error, results) => {
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

    getAllCarts: () => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM cart', (error, results) => {
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