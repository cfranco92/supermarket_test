const storeP = require('./store');

function addProduct(product, store, quantity, shoppingCart) {
    return new Promise(async (resolve, reject) => {
        if (!product || !store || !quantity || !shoppingCart) {
            return Promise.reject('Invalid data');
        }

        const orderDetail = {
            product,
            store,
            quantity,
            shoppingCart,
            date: new Date()
        }

        const result = await (storeP.add(orderDetail));
        resolve(result);
    });
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Invalid Id');
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}

function updateProduct(identification, quantity) {
    return new Promise(async (resolve, reject) => {
        if (!identification || !quantity) {
            reject('Invalid data');
            return false;
        }

        const orderDetail = {
            identification,
            quantity,
            shoppingCart,
            date: new Date()
        }

        const result = await (store.add(orderDetail));
        resolve(result);
    })
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct
}