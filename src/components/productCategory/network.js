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

router.get('/', function (req, res) {
    controller.getCategories()
        .then((categoryList) => {
            response.success(req, res, categoryList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.get('/:id', cors(corsOptions), function (req, res) {
    controller.getCategory(req.params.id)
        .then((category) => {
            response.success(req, res, category, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
});

router.post('/', function (req, res) {
    controller.addCategory(req.body.categories, req.body.stores, req.body.photo)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
});

router.delete('/:id', function (req, res) {
    controller.deleteCategory(req.params.id)
        .then(() => {
            response.success(req, res, `Category ${req.params.id} deleted`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
});

module.exports = router;