const store = require('./store');

function getOrders() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    });
}

function getOrderById(orderId) {
    console.log('Controller: ', orderId);
    return new Promise(async (resolve, reject) => {
        if (!orderId) {
            return Promise.reject('Invalid data');
        }
        const result = await (store.getOrderById(orderId));
        resolve(result);
    });
}

function confirmOrder(orderId) {
    return new Promise(async (resolve, reject) => {
        if (!orderId) {
            return Promise.reject('Invalid data');
        }
        const result = await (store.confirmOrder(orderId));
        resolve(result);
    })
}

function getOrdersByStore(storeId) {
    return new Promise((resolve, reject) => {
        resolve(store.getOrdersByStore(storeId));
    });
}

function addOrder(customer, products, status, totalOrder) {
    return new Promise(async (resolve, reject) => {
    if (!products || !customer || !status || !totalOrder) {
        return Promise.reject('Invalid data');
    }
    String(products);
    const newOrder = {
        products, 
        customer, 
        status, 
        totalOrder,
        date: new Date()
    }


    const result = await (store.add(newOrder));
    resolve(result);
    });
}

module.exports = {
    getOrderById,
    getOrders,
    confirmOrder,
    getOrdersByStore,
    addOrder
}