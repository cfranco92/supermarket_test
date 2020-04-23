const store = require('./store');

function newCart(customer) {
    return new Promise(async (resolve, reject) => {
        console.log(customer);
        if (!customer) {
            return Promise.reject('Invalid data');
        }

        const cart = {
            customer,
            date: new Date()
        }

        const result = await (store.add(cart));
        resolve(result);
    });
}

function getCart(filter) {
    return new Promise((resolve, reject) => {
        resolve(store.getCart(filter));
    });
}

function totalizer(identification) {
    return new Promise(async (resolve, reject) => {
        await store.totalizer(identification)
    })
}

function getTotal(filter) {
    return new Promise((resolve, reject) => {
        resolve(store.total(filter));
    });
}

function cleanCart(cartId) {
    return new Promise((resolve, reject) => {
        resolve(store.cleanCart(cartId));
    });
}

module.exports = {
    newCart,
    getCart,
    totalizer,
    getTotal,
    cleanCart
}