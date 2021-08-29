const verfiy = document.querySelector('.verify');
const backToVerify = document.querySelector('.backToVerify');
const vo = document.querySelector('.vo');
const co = document.querySelector('.co');
const step1 = document.querySelector('.step1');
const step2 = document.querySelector('.step2');


verfiy.addEventListener('click', e=>{
    vo.style.display='none';
    co.style.display='initial';
    step1.classList.replace('active', 'completed');
    step2.classList.add('active');
});

backToVerify.addEventListener('click', e=>{
    vo.style.display='initial';
    co.style.display='none';
    step2.classList.remove('active');
    step1.classList.replace('completed', 'active');
    
});


/////
const load = document.querySelector('.load');
const galery = document.querySelector('.galery');
load.addEventListener('click', e=>{
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT product_title FROM products LIMIT 16, 8", function (err, result, fields) {
          connection.release();
          if (err) throw err;
          res.render('index', {products: result});
          const products = result;
          products.forEach(product => {
              galery.innerHTML +=
              `
                <div class="cardd">
                  <div class="fakeimg" style="height: 200px;">Image</div>
                  <div class="containerr">
                    <h2>{product.product_title}</h2>
                    <h5>Price: {product.product_price} $$</h5>
                  </div>
                  <div class="btnwrapper">
                    <button>button</button>
                    <button>button</button>
                  </div>
                </div>
              `;
          });
          
        });
      });
});

