const DB = require("../db")
 
module.exports = {


    /*createProduct: (product) => {
        return new Promise((acepted, rejected) => {
            DB.query('INSERT INTO products (title, description, img, fk_product_category, sizes, price, quantity) values (?,?,?,?,?,?,?)', 

            [product.title, product.description, product.img, product.fk_product_category, product.sizes, product.price, product.quantity], (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                acepted(results.insertCodigo);

            })
        });
    },*/

    createProduct: (product) => {
        return new Promise((acepted, rejected) => {
            DB.query('INSERT INTO products (title, description, img, price, category, sizes, quantity) VALUES (?,?,?,?,JSON_ARRAY(?),JSON_ARRAY(?),JSON_ARRAY(?))', 

            [product.title, product.description, product.img, product.price, product.category, product.sizes, product.quantity], (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                acepted(results.insertCodigo);

            })
        });
    },


    modifyTitle: (id, title) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE products SET title=? WHERE id=?', 
            
            [title, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    modifyDescription: (id, description) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE products SET description=? WHERE id=?', 
            
            [description, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    modifyImage: (id, img) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE products SET img=? WHERE id=?', 

            [img, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    modifyCategory: (id, category) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE products SET fk_product_category=? WHERE id=?', 
            
            [category, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    modifySizes: (id, sizes) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE products SET sizes=? WHERE id=?', 
            
            [sizes, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    modifyPrice: (id, price) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE products SET price=? WHERE id=?', 
            
            [price, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },

    modifyQuantity: (id, quantity) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE products SET quantity=? WHERE id=?', 
            
            [quantity, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            })
        });
    },
    

    deleteProduct: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('DELETE FROM products WHERE id=?', [id], (error,results) =>{
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            });
        });
    },

    getProduct: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM product WHERE id = ?', [id], (error, results) => {
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

    getAllProducts: () => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM products', (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                if(results.length > 0){
                    const decodedResponse = results.map((item) => {
                        item.Category = JSON.parse(item.Category.replace(/\\/g, ''));
                        item.Sizes = JSON.parse(item.Sizes.replace(/\\/g, ''));
                        item.Quantity = JSON.parse(item.Quantity.replace(/\\/g, ''));
                        return item
                    });

                    acepted(decodedResponse);
                }
            })
        });
    }

}