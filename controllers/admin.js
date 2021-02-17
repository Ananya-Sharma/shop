const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('./admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodID = req.params.productId;
  Product.findById(prodID, product=>{
    res.render('./admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/edit-product',
      editing: editMode,
      product : product,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.product;
    const imageURL = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title,imageURL,description,price);
    product.save()
    .then(() => {
      res.redirect('/products');
    })
    .catch(err => console.log(err));
  };

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productID;
    const title = req.body.product;
    const imageURL = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price;
    const updatedProduct = new Product(prodID,title,imageURL,description,price);
    updatedProduct.save();
    res.redirect('/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
    res.render('./admin/products', {
      pageTitle: 'Admin Products',
      path: '/adminProduct',
      prods: products,
      hasProducts: products.length > 0,
      formsCSS: true,
      productCSS: true,
      activeAdminProduct: true
    });
    });
};

exports.postDeleteProduct = (req,res,next) => {
  prodID = req.body.productID;
  Product.deleteById(prodID);
  res.redirect('/products');
}