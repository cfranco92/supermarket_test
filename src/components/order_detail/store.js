const mongoose = require('mongoose');
const orderDetailModel = require('./model');
const shoppingCartModel = require('../shoppingCart/model');

async function addProduct(orderDetail) {
    const myOrderDetail = new orderDetailModel(orderDetail);
    await myOrderDetail.save(async function(err) {
        const foundShoppingCart = await shoppingCartModel.findOne({
            _id: orderDetail.shoppingCart
        });
        foundShoppingCart.products.push(myOrderDetail._id);
        const newStatus = await foundShoppingCart.save();
        return newStatus;
    });
}

function removeProduct(id) {
    return Model.deleteOne({
        _id: id
    });
}

// TODO
async function updateProduct(id, quantity) {
    const foundProduct = await Model.findOne({
        _id: id
    });

    foundProduct.quantity = quantity;

    const newProduct = await foundProduct.save();
    return newProduct;
}

module.exports = {
    add: addProduct,
    remove: removeProduct,
    update: updateProduct
}