const db = require('../models')
const Basket = db.sequelize.models.Basket;
const User = db.sequelize.models.User;


/**
 * handling products requests
 */
const BasketController = {
    

    

    /**
     * Fetches a list of products based on a specific category
     * @param {*} req 
     * @param {*} res 
     */
    async addToBasket(req, res) {
       
        
        try {

            // let id = req.body.product_id;
            // console.log(req.body.product_id);
            // console.log(req.body);
            // console.log(req.query);

            const uid = req.user.googleId;
            const pid = req.body.id;

          await Basket.create({ product_id: pid, user_id: uid});
          console.log(pid, uid);
          return res.redirect('/products/category1');
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


    
    // /**
    //  * Fetches details of a specific product
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    // async getProductDetails (req, res) {
    //     try {
    //         const product = await Product.findOne({
    //             where: { product_id: req.params.product_id },
    //             attributes: ['name', 'description', 'price', 'stock', 'image']
    //         })

    //         return res.render('viewDetails', { product });
    //     } catch (err) {
    //         console.log(err)
    //         return res.status(500).send(err)
    //     }
    // },

    

    
}

module.exports = BasketController