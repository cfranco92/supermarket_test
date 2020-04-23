const Model = require('./model');

// async function getProducts() {
//     const products = await Model.find();
//     return products;
// }

async function getProducts() {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('factory')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}

async function addProduct(product) {
    const myProduct = new Model(product);
    await myProduct.save();
}

async function getProduct(filterProduct) {
    let filter = {};
    if (filterProduct !== null) {
        filter = { _id: filterProduct };
    }
    const product = await Model.find(filter);
    return product;
}

async function getProductsByCategory(filterProduct) {
    let filter = {};
    if (filterProduct !== null) {
        filter = { categories: filterProduct };
    }
    const product = await Model.find(filter);
    return product;
}

async function updateProduct(productId, store, productCategory) {
    const foundProduct = await Model.findOne({
        _id: productId
    });
    foundProduct.stores.push(store)
    foundProduct.categories.push(productCategory);

    const newStatus = await foundProduct.save();
    return newStatus;
}

function removeProduct(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getProducts,
    add: addProduct,
    doc: getProduct,
    remove: removeProduct,
    pushCategory: updateProduct,
    getByCategory: getProductsByCategory
 }