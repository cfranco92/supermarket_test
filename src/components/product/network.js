const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const cors = require('cors');

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


router.get('/', function (req, res) {
    controller.getProducts()
        .then((productList) => {
            response.success(req, res, productList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.get('/:id', cors(corsOptions), function (req, res) {
    controller.getProduct(req.params.id)
        .then((productList) => {
            response.success(req, res, productList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.get('/byCategory/:categoryId', cors(corsOptions), function (req, res) {
    controller.getByCategory(req.params.categoryId)
        .then((productList) => {
            response.success(req, res, productList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', function (req, res) {
    controller.addProduct(
        req.body.name,
        req.body.costPrice,
        req.body.sellerPrice,
        req.body.publicPrice,
        req.body.description,
        req.body.photo,
        req.body.factory
    )
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
});

router.patch('/:productId', function (req, res) {
    console.log('Store',req.body.store);
    console.log('category', req.body.productCategory);
    controller.addStoreCategory(
            req.params.productId, 
            req.body.store,
            req.body.productCategory
        )
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        });
});

router.delete('/:id', function (req, res) {
    controller.deleteProduct(req.params.id)
        .then(() => {
            response.success(req, res, `Product ${req.params.id} deleted`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
});

module.exports = router;