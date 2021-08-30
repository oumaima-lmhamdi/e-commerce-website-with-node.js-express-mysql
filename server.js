const db = require('./models');
// database connection
require('./database/connection');
// passport setup
require('./config/passport-setup');
// routes
const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/productRoutes');
const basketRoutes = require('./routes/basketRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const express = require('express');
const bodyParser = require('body-parser');

// express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// listen for requests
db.sequelize.sync().then(() => {
  app.listen(3000);
});





// middleware & static files
app.use(express.static('public'));

// register view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/viewDetails', (req, res) => {
  res.render('viewDetails', { c:"home" });
});

app.get('/', (req, res) => {

  
  // pool.getConnection(function (err, connection) {
  //   if (err) throw err;
  //   connection.query("SELECT product_title, product_price FROM products LIMIT 16", function (err, result, fields) {
  //     connection.release();
  //     if (err) throw err;
  //     res.render('index', {products: result});
  //   });
  // });

});


app.get('/changePassword', (req, res) => {
  res.render('fillIn', { url:req.route.path});
});

app.get('/contactUs', (req, res) => {
  res.render('fillIn', { url:req.route.path});
});

app.get('/logIn', (req, res) => {
  res.render('fillIn', { url:req.route.path});
});

app.get('/singUp', (req, res) => {
  res.render('fillIn', { url:req.route.path});
});

app.get('/shop', (req, res) => {
  res.render('shop', { c:"shop" });
});

app.get('/basket', (req, res) => {
  res.render('basket', { c:"shop" });
});

// product routes
app.use('/products', productRoutes);
// basket routes
app.use('/baskets', basketRoutes);
// set up routes
app.use('/auth', authRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { user: req.user });
});


