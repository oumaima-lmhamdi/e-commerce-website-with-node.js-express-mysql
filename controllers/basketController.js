const db = require('../models')
const Basket = db.sequelize.models.Basket;

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
            INSERT INTO baskets (user_id, product_id, quantity)
            VALUES ('${req.user.googleId}', '${req.body.id}', '${req.body.quantity}');
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
                `SELECT products.name, products.price, baskets.basket_id, baskets.product_id, baskets.quantity FROM products INNER JOIN baskets ON products.product_id=baskets.product_id WHERE baskets.user_id = '${req.user.googleId}'`,
                { type: sequelize.QueryTypes.SELECT});
            
                let total= products.reduce(function (accumulator, product) {
                    return accumulator + product.quantity * product.price;
                  }, 0);
                const formatedTotal = (Math.round(total * 100) / 100).toFixed(2);
            return res.render('basket', { products, user:req.user, formatedTotal });
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    
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