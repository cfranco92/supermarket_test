const store = require('./store');

function getStores(filterStore) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterStore));
    })
}

function getStoreByUser(filterStore) {
    return new Promise((resolve, reject) => {
        resolve(store.docByUser(filterStore));
    });
}

function addStore(name, logo, city, department, seller, neighborhood) {
    if (!name || !logo || !city || !department || !seller || !neighborhood) {
        return Promise.reject('Invalid data');
    }

    const newStore = {
        name, 
        logo, 
        city, 
        department, 
        seller, 
        neighborhood,
        date: new Date()
    }

    return store.add(newStore);
}

function addOrder(storeId, orderDetailId) {
    return new Promise(async (resolve, reject) => {
        if (!storeId || !orderDetailId) {
            return Promise.reject('Invalid data');
        }
        const result = await store.addOrder(storeId, orderDetailId);
        resolve(result);
    })
}

module.exports = {
    getStores,
    getStoreByUser,
    addStore,
    addOrder
}