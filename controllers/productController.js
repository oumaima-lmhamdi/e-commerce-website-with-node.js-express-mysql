const db = require('../models')
const Sequelize = require('sequelize');
const Product = db.sequelize.models.Product
const Op = Sequelize.Op;



/**
 * handling products requests
 */
const ProductController = {

    

    /**
     * Fetches a list of products based on a specific category
     * @param {*} req 
     * @param {*} res 
     */
    async getProductsByCategory (req, res) {
       
        try {

            const products = await Product.findAll({
                where: { category_name: req.params.category_name },
                attributes: ['product_id', 'name', 'price'],
              });
            return res.render('shop', { products, category_name:req.params.category_name });
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    ////////////////////////////

    /**
     * Fetches a list of products based on a specific category and subcategory
     * @param {*} req 
     * @param {*} res 
     */
     async getProductsBySubCategory (req, res) {
       
        try {

            const products = await Product.findAll({
                where: { category_name: req.params.category_name, subcategory_name: req.params.subcategory_name  },
                attributes: ['product_id', 'name', 'price'],
              });
            return res.render('shop', { products, category_name:req.params.category_name, subcategory_name:req.params.subcategory_name });
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },


    /**
     * Fetches a list of products based on a search keyword
     * @param {*} req 
     * @param {*} res 
     */
     async searchProducts (req, res) {
       
        try {
            
           
                // // get query term and make to lowercase 
                const term = req.query.term.toLowerCase();

                const products = await Product.findAll({
                    where: { name: { [Op.like]: "%" + term + "%" } },
                    attributes: ['product_id', 'name', 'price'],
                  });
                return res.render('shop', {products, term} );
            
            


        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },


    
    /**
     * Fetches details of a specific product
     * @param {*} req 
     * @param {*} res 
     */
    async getProductDetails (req, res) {
        try {
            const product = await Product.findOne({
                where: { product_id: req.params.product_id },
                attributes: ['name', 'description', 'price', 'stock', 'image']
            })

            return res.render('viewDetails', { product });
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    

    
}

module.exports = ProductController