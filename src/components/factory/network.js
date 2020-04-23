const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res) {
    const filterFactories = req.query.factory || null;
    controller.getFactories(filterFactories)
        .then((factoryList) => {
            response.success(req, res, factoryList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.get('/user/:userId', function (req, res) {
    const filterFactories = req.params.userId || null;
    controller.getFactoryByUser(filterFactories)
        .then((factoryList) => {
            response.success(req, res, factoryList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', function(req, res) {
    controller.addFactory(
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


module.exports = router;