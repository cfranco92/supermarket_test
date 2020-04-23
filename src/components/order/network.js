const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// End-Points
router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.get('/store/:storeId', getOrdersByStore);
router.post('/', addOrder);
router.patch('/confirm/:orderId', confirmOrder);

// Functions
function getOrderById(req, res) {
    controller.getOrderById(req.params.orderId)
        .then((order) => {
            response.success(req, res, order, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function confirmOrder(req, res) {
    controller.confirmOrder(req.params.orderId)
        .then((order) => {
            response.success(req, res, order, 201);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function getOrders(req, res) {
    controller.getOrders()
        .then((orderList) => {
            response.success(req, res, orderList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function getOrdersByStore(req, res) {
    controller.getOrdersByStore(req.params.storeId)
        .then((orderList) => {
            response.success(req, res, orderList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function addOrder(req, res) {
    controller.addOrder(
        req.body.customer,
        req.body.products,
        req.body.status,
        req.body.totalOrder
    )
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

module.exports = router;