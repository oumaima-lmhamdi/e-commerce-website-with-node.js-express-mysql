const express = require('express');
const basketController = require('../controllers/basketController');
const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};



router.post('/add', authCheck, basketController.addToBasket);
router.get('/', authCheck, basketController.getBasketProducts);
router.delete('/removeProduct/:product_id', authCheck, basketController.removeFromBasket);
router.delete('/clearBasket/:user_id', authCheck, basketController.clearBasket);


module.exports = router;