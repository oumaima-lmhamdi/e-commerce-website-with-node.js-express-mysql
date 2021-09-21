const db = require('../models')
const Basket = db.sequelize.models.Basket;



/**
 * handling products requests
 */
const OrderDeliveryController = {

    

    /**
     * Confirem Order and Delivery
     * @param {*} req 
     * @param {*} res 
     */
     async postOrderDelivery(req, res) {
        try {

            await sequelize.query(`
            INSERT INTO delivery_locations (user_id, adress, city, zip, telephone)
            VALUES ('${req.user.googleId}', '${req.body.adress}', '${req.body.city}', '${req.body.zip}', '${req.body.telephone}');
            `, {type: sequelize.QueryTypes.INSERT});
            const delivery_id_object = await sequelize.query(`
            SELECT delivery_location_id FROM delivery_locations WHERE user_id = '${req.user.googleId}' ORDER BY created_at DESC LIMIT 1;
            `, {type: sequelize.QueryTypes.SELECT});
            const delivery_id = Object.values(delivery_id_object[0]);     
            await sequelize.query(`
            INSERT INTO orders (user_id, deliverylocation_id, total_amount) VALUES ('${req.user.googleId}', '${delivery_id}', '${req.body.totalamount}');
            `, {type: sequelize.QueryTypes.INSERT});
            
            const order_id_object = await sequelize.query(
                `SELECT order_id FROM orders WHERE user_id = '${req.user.googleId}' ORDER BY created_at DESC LIMIT 1`,
                { type: sequelize.QueryTypes.SELECT});
            const order_id = Object.values(order_id_object[0]);
            const orderProducts = await sequelize.query(
                `SELECT products.product_id, baskets.quantity FROM products INNER JOIN baskets ON products.product_id=baskets.product_id WHERE baskets.user_id = '${req.user.googleId}'`,
                { type: sequelize.QueryTypes.SELECT});
            orderProducts.forEach(product =>{
                sequelize.query(`
                INSERT INTO orders_details (order_id, product_id, quantity) VALUES ('${order_id}','${product.product_id}', '${product.quantity}');
                `, {type: sequelize.QueryTypes.INSERT});
            })

            await Basket.destroy({
                where: { user_id: req.user.googleId  }
              });
            return res.redirect('/products/category1');
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches list of orders for a specific user
     * @param {*} req 
     * @param {*} res 
     */
     async getOrders(req, res) {
       
        
        try {

            const orders = await sequelize.query(
                `SELECT orders.order_id, orders.total_amount, products.name, products.image, products.price, orders_details.quantity, delivery_locations.adress, delivery_locations.city FROM products, orders_details, delivery_locations, orders WHERE delivery_locations.delivery_location_id = orders.deliverylocation_id AND orders.order_id = orders_details.order_id AND orders_details.product_id = products.product_id AND orders.user_id = '${req.user.googleId}'`,
                { type: sequelize.QueryTypes.SELECT}).catch(err=> console.log(err));
            // return res.send(orders[0].order_id);
            
            return res.render('orders', { url:req.route.path, user: req.user, orders });
            // return res.render('orders', { orders, user:req.user });
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    
}

module.exports = OrderDeliveryController