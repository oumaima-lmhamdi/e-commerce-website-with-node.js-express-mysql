const db = require('./models');
// database connection
require('./database/connection');
// passport setup
require('./config/passport-setup');
const productRoutes = require('./routes/productRoutes');

// routes
const authRoutes = require('./routes/auth-routes');

// const pool = require('./connection');

const express = require('express');
const bodyParser = require('body-parser');

// express app
const app = express();
app.use(bodyParser.json());

// listen for requests
db.sequelize.sync().then(() => {
  app.listen(3000);
});





// middleware & static files
app.use(express.static('public'));

// register view engine
app.set('view engine', 'ejs');

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

// set up routes
app.use('/auth', authRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { c:"" });
});


