const data = require('./store');

function getCategories() {
    return new Promise((resolve, reject) => {
        resolve(data.list());
    });
}

function getCategory(filterCategory) {
    return data.doc(filterCategory)
}

function addCategory(category, store, photo) {
    return new Promise(async (resolve, reject) => {
        if (!category || !store) {
            return Promise.reject('Invalid data');
        }

        const myCategory = {
            category, 
            store,
            photo,
            date: new Date()
        }

        const result = await (data.add(myCategory));
        resolve(result);
    })
}

function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Invalid Id');
            return false;
        }
        data.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}

module.exports = {
    getCategories,
    addCategory,
    getCategory,
    deleteCategory
}