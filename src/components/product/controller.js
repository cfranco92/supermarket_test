const store = require('./store');

function getProducts() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    });
}

function getProduct(filterProduct) {
    return store.doc(filterProduct)
}

function getByCategory(filterProduct) {
    return store.getByCategory(filterProduct)
}

function addProduct(
    name,
    costPrice,
    sellerPrice,
    publicPrice,
    description,
    photo,
    factory) {
    return new Promise(async (resolve, reject) => {
    if (!name || !costPrice || !sellerPrice || !publicPrice || !description || !photo || !factory) {
        return Promise.reject('Invalid data');
    }

    const product = {
        name,
        costPrice,
        sellerPrice,
        publicPrice,
        description,
        photo,
        factory,
        date: new Date()
    }

    const result = await (store.add(product));
    resolve(result);
    });
}

// TO DO
function addStoreCategory(productId, myStore, productCategory) {
    return new Promise(async (resolve, reject) => {
        console.log(productId);
        console.log(myStore);
        console.log(productCategory);
        if (!productId || !myStore || !productCategory) {
            reject('Invalid data');
            return false;
        }

        const result = await store.pushCategory(productId, myStore, productCategory);

        resolve(result);
    })
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

module.exports = {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    addStoreCategory,
    getByCategory
}