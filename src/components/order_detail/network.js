// By Cristian
const express = require('express');
const cors = require('cors');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const env = require('../../env/environment');

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = env.corsOptions;

// End-Points
router.post('/', cors(corsOptions), addProduct);
router.post('/:id/quantity', cors(corsOptions), editQuantity);
router.delete('/:id', cors(corsOptions),deleteProduct);

// Functions
function addProduct(req, res) {
    controller.addProduct(req.body.product, req.body.store, req.body.quantity, req.body.shoppingCart)
        .then((product) => {
            response.success(req, res, product, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function editQuantity(req, res) {
    controller.addCategory(req.params.id, req.body.quantity)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function deleteProduct(req, res) {
    controller.deleteCategory(req.params.id)
        .then(() => {
            response.success(req, res, `Product ${req.params.id} removed from shopping cart`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

module.exports = router;