const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/products/category3');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}));

// redirect URL
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.redirect('/products/category3');
});

module.exports = router;