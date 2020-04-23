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

router.get('/', cors(corsOptions), function (req, res) {
    const filterStores = req.query.store || null;
    controller.getStores(filterStores)
        .then((storeList) => {
            response.success(req, res, storeList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.get('/user/:userId', function (req, res) {
    const filterStores = req.params.userId || null;
    controller.getStoreByUser(filterStores)
        .then((storeList) => {
            response.success(req, res, storeList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', function(req, res) {
    controller.addStore(
        req.body.name, 
        req.body.logo, 
        req.body.city, 
        req.body.department, 
        req.body.seller, 
        req.body.neighborhood
        )
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
});

router.patch('/addOrder/:storeId', function(req, res) {
    controller.addOrder(
        req.params.storeId,
        req.body.orderDetailId
    )
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, 'Internal Error', 500, e);
    })

});


module.exports = router;