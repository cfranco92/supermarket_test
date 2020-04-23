const Model = require('./model');

async function getFactory(filterFactory) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterFactory !== null) {
            filter = { _id: filterFactory };
        }
        Model.find(filter)
            .populate('producer')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}

async function getFactoryByUser(filterFactory) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterFactory !== null) {
            filter = { producer: { _id: filterFactory } };
        }
        Model.find(filter)
            .populate('producer')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}

function addFactory(factory) {
    const myFactory = new Model(factory);
    return myFactory.save();
}

module.exports = {
    add: addFactory,
    list: getFactory,
    docByUser: getFactoryByUser
}