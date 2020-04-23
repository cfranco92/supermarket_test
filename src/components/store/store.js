const Model = require('./model');

async function getStores(filterStore) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterStore !== null) {
            filter = { _id: filterStore };
        }
        Model.find(filter)
            .populate('seller')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}

async function getStoreByUser(filterStore) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterStore !== null) {
            filter = { seller: { _id: filterStore } };
        }
        Model.find(filter)
            .populate('seller')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}

function addStore(store) {
    const myStore = new Model(store);
    return myStore.save();
}

async function addOrder(storeId, orderDetailId) {
    const foundStore = await Model.findOne({
        _id: storeId
    });
    foundStore.orders.push(orderDetailId);
    
    const newStatus = await foundStore.save();
    return newStatus;
}

module.exports = {
    add: addStore,
    list: getStores,
    docByUser: getStoreByUser,
    addOrder: addOrder
}