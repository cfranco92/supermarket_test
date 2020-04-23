const mongoose = require('mongoose');
const Model = require('./model');
const storeModel = require('../store/model');
const factoryModel = require('../factory/model');

async function getUsers() {
    const users = await Model.find();
    return users;
}

async function addUser(user, company) {
    user._id = new mongoose.Types.ObjectId();
    const myUser = new Model(user);
    await myUser.save(async function (err) {
        // if (err) return handleError(err);
        if (user.role === 'vendedor') {
            company.seller = myUser._id;
            const myStore = new storeModel(company);
            const store = await myStore.save();
            return store;
        }
        if (user.role === 'productor') {
            company.producer = myUser._id;
            const myFactory = new factoryModel(company);
            const factory = await myFactory.save();
            return factory;
        }
    });
}

async function addCustomer(user) {
    user._id = new mongoose.Types.ObjectId();
    const myUser = new Model(user);
    return myUser.save();
}

async function addUserData(token, nameSurname, telephone, department, city, address, observations) {
    const foundUser = await Model.findOne({
       token: token 
    });
    foundUser.nameSurname = nameSurname;
    foundUser.telephone = telephone;
    foundUser.department = department;
    foundUser.city = city;
    foundUser.address = address;
    foundUser.observations = observations;

    const newStatus = await foundUser.save();
    return newStatus;
}

async function getUser(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = { identification: filterUser };
    }
    const user = await Model.find(filter);
    return user;
}

async function getUserById(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = { _id: filterUser };
    }
    const user = await Model.find(filter);
    return user;
}

async function getUserByToken(userToken) {
    const user = await Model.find({
        token: userToken
    });
    return user;
}

function removeUser(id) {
    return Model.deleteOne({
        _id: id
    });
}

async function updateUserName(id, user) {
    const foundUser = await Model.findOne({
        _id: id
    });

    foundUser.identification = user.identification;
    foundUser.phone = user.phone;
    foundUser.name = user.name;
    foundUser.lastName = user.lastName;
    foundUser.address = user.address;
    foundUser.city = user.city;
    foundUser.department = user.department;
    foundUser.neighborhood = user.neighborhood;
    foundUser.photo = user.photo;

    const newUser = await foundUser.save();
    return newUser;
}

module.exports = {
    list: getUsers,
    add: addUser,
    getUserByToken: getUserByToken,
    addCustomer: addCustomer,
    addUserData: addUserData,
    doc: getUser,
    docById: getUserById,
    remove: removeUser,
    update: updateUserName,
}