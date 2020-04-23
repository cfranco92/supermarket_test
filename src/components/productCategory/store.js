// By Cristian
const Model = require('./model');

async function getCategories() {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('store')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}

async function addCategory(category) {
    const myCategory = new Model(category);
    await myCategory.save();
}

async function getCategory(filterCategory) {
    let filter = {};
    if (filterCategory !== null) {
        filter = { store: filterCategory };
    }
    const category = await Model.find(filter);
    return category;
}

function removeCategory(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getCategories,
    add: addCategory,
    doc: getCategory,
    remove: removeCategory
 }