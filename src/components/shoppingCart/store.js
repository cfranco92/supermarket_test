const mongoose = require('mongoose');
const Model = require('./model');

async function newCart(cart) {
    const myCart = new Model(cart);
    await myCart.save();
}

// TODO LIST
async function getCart(filterProduct) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterProduct !== null) {
            filter = { customer: filterProduct };
        }
        Model.find(filter)
            .populate({
                path: 'products',
                populate: [{
                    path: 'product'
                }]
            })

            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    });
}

async function cleanCart(cartId) {
    const foundCart = await Model.findOne({
        _id: cartId
    });
    foundCart.products = [];

    const newStatus = await foundCart.save();
    return newStatus;
}

// TODO TOTALIZER

// TODO TOTAL

module.exports = {
    add: newCart,
    getCart: getCart,
    cleanCart: cleanCart
}