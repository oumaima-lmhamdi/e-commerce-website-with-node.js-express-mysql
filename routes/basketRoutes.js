const express = require('express');
const basketController = require('../controllers/basketController');
const router = express.Router();



router.post('/add', basketController.addToBasket);
router.get('/', basketController.getBasketProducts);
// router.delete('/removeProduct/:item_id', basketController.removeFromBasket)
// router.delete('/empty/:cart_id', basketController.clearBasket)


module.exports = router;