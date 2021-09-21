const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.post('/', authCheck, messageController.postMessage);

module.exports = router;