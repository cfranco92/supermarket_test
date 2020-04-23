const store = require('./store');

function getFactories(filterFactory) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterFactory));
    })
}

function getFactoryByUser(filterFactory) {
    return new Promise((resolve, reject) => {
        resolve(store.docByUser(filterFactory));
    });
}

function addFactory(name, logo, city, department, seller, neighborhood) {
    if (!name || !logo || !city || !department || !seller || !neighborhood) {
        return Promise.reject('Invalid data');
    }

    const newFactory = {
        name, 
        logo, 
        city, 
        department, 
        seller, 
        neighborhood,
        date: new Date()
    }

    return store.add(newFactory);
}

module.exports = {
    getFactories,
    addFactory,
    getFactoryByUser
}