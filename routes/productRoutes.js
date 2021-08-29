const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/search', productController.searchProducts);
router.get('/:product_id/details', productController.getProductDetails);
router.get('/:category_name', productController.getProductsByCategory);
router.get('/:category_name/:subcategory_name', productController.getProductsBySubCategory);

module.exports = router;