const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const p = path.join(rootDir,'data','cart.json');

module.exports = class Cart{
     static addProduct(id, productPrice){

        // Fetch previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart ={products:[], totalPrice : 0};
            if (!err) {
              cart = JSON.parse(fileContent);
            }
        
        // Analyze the cart
        const existingProductIndex = cart.products.findIndex(product => product.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct){
            let updatedProduct = {...existingProduct};
            updatedProduct.qty = updatedProduct.qty+1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex]=updatedProduct;
        }
        else{
            updatedProduct = {id:id,qty:1};
            cart.products=[...cart.products,updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
          });
        });
     }

     static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            let cart;
            if (err) {
              return;
            }
            cart = JSON.parse(fileContent);

            const updatedCart = {...cart};
            const product= updatedCart.products.find(p=> p.id === id);
            if(!product)
            return;
            updatedCart.products = updatedCart.products.filter(p=>p.id!== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice*product.qty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
              });
        });
     }

     static getCart(cb){
        fs.readFile(p, (err, fileContent) => {
         const Cart = JSON.parse(fileContent);
         if (err) {
            cb(null);
          }
          else 
            cb(Cart);
        });
     }
};