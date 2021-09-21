const express = require('express');
const orderDeliveryController = require('../controllers/orderDeliveryController');
const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, orderDeliveryController.getOrders);
router.post('/delivery', authCheck, orderDeliveryController.postOrderDelivery);


module.exports = router;