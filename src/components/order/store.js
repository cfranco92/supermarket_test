const mongoose = require('mongoose');
const Model = require('./model');

async function getOrderById(orderId) {
    const order = await Model.find({
        _id: orderId
    });
    return order
}

async function getOrders() {
    const orders = await Model.find();
    return orders;
}

async function confirmOrder(orderId) {
    const foundOrder = await Model.findOne({
        _id: orderId
    });
    foundOrder.status = 'confirmado';

    const newStatus = await foundOrder.save();
    return newStatus;
}

async function getOrdersByStore(storeId) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (storeId !== null) {
            filter = { customer: storeId };
        }
        Model.find()
            .populate({
                path: 'Products',
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

async function addOrder(order) {
    const myOrder = new Model(order);
    return myOrder.save();
}

module.exports = {
    list: getOrders,
    add: addOrder,
    getOrderById: getOrderById,
    getOrdersByStore: getOrdersByStore,
    confirmOrder: confirmOrder
}