const express = require('express');
const basketController = require('../controllers/basketController');
const router = express.Router();



router.post('/add', basketController.addToBasket);
router.get('/', basketController.getBasketProducts);
router.delete('/removeProduct/:product_id', basketController.removeFromBasket);
router.delete('/clearBasket/:user_id', basketController.clearBasket);


module.exports = router;