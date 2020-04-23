const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// End-Points
router.get('/', getUsers);
router.get('/:identification', getUser);
router.get('/id/:id', getUserById);
router.get('/token/:userToken', getUserByToken);
router.post('/auth/', auth);
router.post('/', addUser);
router.post('/customer', addCustomer)
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.patch('/addData/:userToken', addUserData);

// Functions
function getUserByToken(req, res) {
    controller.getUserByToken(req.params.userToken)
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
} 

function getUsers(req, res) {
    controller.getUsers()
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function auth(req, res) {
    controller.authUser(req.body.identification, req.body.password)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function getUser(req, res) {
    controller.getUser(req.params.identification)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function getUserById(req, res) {
    controller.getUserById(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
}

function addUser(req, res) {
    controller.addUser(
        req.body.identification,
        req.body.phone,
        req.body.name,
        req.body.lastName,
        req.body.address,
        req.body.city,
        req.body.department,
        req.body.neighborhood,
        req.body.photo,
        req.body.password,
        req.body.role,
        req.body.companyName,
        req.body.companyLogo,
        req.body.companyCity,
        req.body.companyDepartment,
        req.body.companyNeighborhood
    )
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function addCustomer(req, res) {
    controller.addCustomer(
        req.body.token,
        req.body.role,
    )
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function deleteUser(req, res) {
    controller.deleteUser(req.params.id)
        .then(() => {
            response.success(req, res, `User ${req.params.id} deleted`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        })
}

function updateUser(req, res) {
    controller.updateUser(req.params.id,
        req.body.identification,
        req.body.phone,
        req.body.name,
        req.body.lastName,
        req.body.address,
        req.body.city,
        req.body.department,
        req.body.neighborhood,
        req.body.photo,
        req.body.password,
        req.body.role
    )
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        });
}

function addUserData(req, res) {
    controller.addUserData(
        req.params.userToken,
        req.body.nameSurname,
        req.body.telephone,
        req.body.department,
        req.body.city,
        req.body.address,
        req.body.observations
    )
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal Error', 500, e);
        });
}


module.exports = router;