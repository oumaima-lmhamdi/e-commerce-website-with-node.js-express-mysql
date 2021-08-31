const db = require('../models')
const Basket = db.sequelize.models.Basket;
const User = db.sequelize.models.User;
const Product = db.sequelize.models.Product;

/**
 * handling products requests
 */
const BasketController = {
    

    

    /**
     * Add a product to basket
     * @param {*} req 
     * @param {*} res 
     */
    async addToBasket(req, res) {
       
        
        try {

            // const pid = req.body.id;
          
        //   await Basket.create({ product_id: pid, user_id: req.user.googleId});
            await sequelize.query(`
            INSERT INTO baskets (user_id, product_id)
            VALUES ('${req.user.googleId}', '${req.body.id}');
          `, {type: sequelize.QueryTypes.INSERT});
          return res.redirect('/products/category1');
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches list of products on a specific basket
     * @param {*} req 
     * @param {*} res 
     */
     async getBasketProducts(req, res) {
       
        
        try {
            

            const products = await sequelize.query(
                `SELECT products.name, baskets.product_id FROM products INNER JOIN baskets ON products.product_id=baskets.product_id WHERE baskets.user_id = '${req.user.googleId}'`,
                { type: sequelize.QueryTypes.SELECT});
            // const products = await Basket.findAll({
            //     include: [

            //         {model: Product} // nothing in attributes here in order to not import columns from products
            //     ],
            //     attributes: ['name'],
            //   });
            console.log(products);
            return res.render('basket', { products, user:req.user });
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },




    // /**
    //  * Fetches a list of products based on a specific category and subcategory
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    //  async getProductsBySubCategory (req, res) {
       
    //     try {

    //         const products = await Product.findAll({
    //             where: { category_name: req.params.category_name, subcategory_name: req.params.subcategory_name  },
    //             attributes: ['product_id', 'name', 'price'],
    //           });
    //         return res.render('shop', { products, category_name:req.params.category_name, subcategory_name:req.params.subcategory_name });
    //     } catch(err) {
    //         console.log(err)
    //         return res.status(500).send(err)
    //     }
    // },


    // /**
    //  * Fetches a list of products based on a search keyword
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    //  async searchProducts (req, res) {
       
    //     try {
            
           
    //             // // get query term and make to lowercase 
    //             const term = req.query.term.toLowerCase();

    //             const products = await Product.findAll({
    //                 where: { name: { [Op.like]: "%" + term + "%" } },
    //                 attributes: ['product_id', 'name', 'price'],
    //               });
    //             return res.render('shop', {products, term} );
            
            


    //     } catch(err) {
    //         console.log(err)
    //         return res.status(500).send(err)
    //     }
    // },


    
    /**
     * remove product from a basket
     * @param {*} req 
     * @param {*} res 
     */
    async removeFromBasket (req, res) {
        try {
            
            await Basket.destroy({
                            where: { product_id: req.params.product_id  }
                          });
            

            return res.json({ redirect: '/baskets' });
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },


    /**
     * remove product from a basket
     * @param {*} req 
     * @param {*} res 
     */
     async clearBasket (req, res) {
        try {
            
            await Basket.destroy({
                            where: { user_id: req.user.googleId  }
                          });
            

            return res.json({ redirect: '/baskets' });
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },


    

    
}

module.exports = BasketController