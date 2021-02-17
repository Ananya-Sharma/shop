const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProducts =[];
      for(product of products){
        const cartProductData = cart.products.find(p=>p.id === product.id);
        if(cartProductData){
          cartProducts.push({productData:product,qty:cartProductData.qty});
        }
      }
      res.render('./shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products:cartProducts,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findById(prodID, product=>{
    Cart.addProduct(prodID,product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req,res,next)=>{
  const prodID = req.body.productID;
  Product.findById(prodID, product=>{
    Cart.deleteProduct(prodID,product.price);
  });
  res.redirect('/cart');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData]) => {
     res.render('./shop/product-list', {
      prods: rows,
      pageTitle: 'Products',
      path: '/products',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true
    });
  })
  .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([product])=>{
    res.render('./shop/product-detail', {
      pageTitle: 'Product Detail',
      path: '/products',
      product: product[0],
      formsCSS: true,
      productCSS: true,
      activeProductDetails: true
    });
  })
  .catch(err => console.log(err)); 
};

exports.getIndex = (req, res, next) => {
  res.render('./shop/index', {
    pageTitle: 'Shop',
    path: '/',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('./shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.getOrders = (req, res, next) => {
  res.render('./shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};


