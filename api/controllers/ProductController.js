const ProductService = require("../services/ProductService")

module.exports = {
    /*createProduct: async(req, res) => {
        let json = {error:'', result:{}};

        product = req.body

        try {
            const savedProduct = await ProductService.createProduct(product);

            json.result = savedProduct
            res.status(200).json(json);
        } catch (err) {
            res.status(500).json(err);
        }
    },*/

    createProduct: async(req, res) => {
        let json = {error:'', result:{}};

        product = req.body

        try {
            const savedProduct = await ProductService.createProduct(product);

            json.result = savedProduct
            res.status(200).json(json);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateProduct: async(req, res) => {
        try {
            if(req.body.title) {
                var updatedProduct = await ProductService.modifyTitle(req.params.id,req.body.title)
            }
            if(req.body.description) {
                var updatedProduct = await ProductService.modifyDescription(req.params.id,req.body.description)
            }
            if(req.body.img) {
                var updatedProduct = await ProductService.modifyImage(req.params.id,req.body.img)
            }
            if(req.body.fk_product_category) {
                var updatedProduct = await ProductService.modifyCategory(req.params.id,req.body.fk_product_category)
            }
            if(req.body.sizes) {
                var updatedProduct = await ProductService.modifySizes(req.params.id,req.body.sizes)
            }
            if(req.body.price) {
                var updatedProduct = await ProductService.modifyPrice(req.params.id,req.body.price)
            }
            if(req.body.quantity) {
                var updatedProduct = await ProductService.modifyQuantity(req.params.id,req.body.quantity)
            }

            res.status(200);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            if(req.params.id){
                await ProductService.deleteProduct(req.params.id);
                res.status(200).json("Product has been deleted...");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getProduct: async (req, res) => {
        try {
            if(req.params.id){
                const product = await ProductService.getProduct(req.params.id);
                res.status(200).json(product);
            }
        } catch (err) {
            res.status(500).json(err);
      }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await ProductService.getAllProducts();
            //console.log(products)
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}