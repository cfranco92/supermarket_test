const express = require('express');
const user = require('../components/user/network');
const product = require('../components/product/network');
const order = require('../components/order/network');
const store = require('../components/store/network');
const ticket = require('../components/ticket/network');
const factory = require('../components/factory/network');
const productCategory = require('../components/productCategory/network');
const shoppingCart = require('../components/shoppingCart/network');
const orderDetail = require('../components/order_detail/network');

const routes = function(server) {
    server.use('/api/user', user);
    server.use('/api/product', product);
    server.use('/api/order', order);
    server.use('/api/store', store);
    server.use('/api/ticket', ticket);
    server.use('/api/factory', factory);
    server.use('/api/productCategory', productCategory);
    server.use('/api/shoppingCart', shoppingCart);
    server.use('/api/orderDetail', orderDetail);
}

module.exports = routes;