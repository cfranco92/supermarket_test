// By Cristian
const express = require('express');
const cors = require('cors');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}

// End-Points
router.post('/:userId', cors(corsOptions), newCart);
router.get('/:id', cors(corsOptions), getCart);
router.post('/:id/totalize', totalize);
router.get('/:id/totalize', getTotal);
router.patch('/update', updateShoppingCart);
router.patch('/clean/:cartId', cleanCart);

// Functions
function newCart(req, res) {
    controller.newCart(req.body.userId)
        .then(cart => {
            response.success(req, res, cart, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function getCart(req, res) {
    controller.getCart(req.params.id)
        .then((productsList) => {
            response.success(req, res, productsList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
}

function totalize(req, res) {
    controller.totalizer(req.body.shoppingCartId)
        .then(total => {
            response.success(req, res, total, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function getTotal(req, res) {
    controller.getTotal(req.params.shoppingCartId)
        .then((total) => {
            response.success(req, res, total, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
}

function updateShoppingCart(req, res) {
    controller.updateShoppingCart(req.body.cartId)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function cleanCart(req, res) {
    controller.cleanCart(req.params.cartId)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

module.exports = router;