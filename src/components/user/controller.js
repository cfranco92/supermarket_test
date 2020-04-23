const store = require('./store');

function getUsers() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    });
}

function getUser(filterUser) {
    return store.doc(filterUser)
}

function getUserByToken(userToken) {
    return new Promise((resolve, reject) => {
        resolve(store.getUserByToken(userToken));
    });
}

function getUserById(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.docById(filterUser));
    });
}

function authUser(identification, password) {
    return new Promise(async (resolve, reject) => {
        const user = await store.doc(identification)
        if (user[0].password === password) {
            resolve({auth: true, identification: user[0]._id});
        } else{
            reject('Invalid data');
        }
    })
}

function addUser(identification, phone, name, lastName, address, city, department, neighborhood, photo, password, role, 
    companyName, companyLogo, companyCity, companyDepartment, companyNeighborhood) {
    return new Promise(async (resolve, reject) => {
    if (!identification || !phone || !name || !lastName || !address || !city || !department || !neighborhood || !photo ||  !password || !role
        || !companyName || !companyLogo || !companyCity || !companyDepartment || !companyNeighborhood) {
        return Promise.reject('Invalid data');
    }

    const user = {
        identification,
        phone,
        name,
        lastName,
        address,
        city,
        department,
        neighborhood,
        photo,
        password,
        role,
        date: new Date()
    }

    const company = {
        name: companyName, 
        logo: companyLogo, 
        city: companyCity, 
        department: companyDepartment, 
        neighborhood: companyNeighborhood,
        date: new Date()
    }

    const result = await (store.add(user, company));
    resolve(result);
    });
}

function addCustomer(token, role) {
    return new Promise(async (resolve, reject) => {
    if (!token || !role) {
        return Promise.reject('Invalid data');
    }

    const user = {
        token,
        role,
        date: new Date()
    }

    const result = await (store.addCustomer(user));
    resolve(result);
    });
}

function deleteUser(id) {
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

function updateUser(id, identification, phone, name, lastName, address, city, department, neighborhood, photo, password, role) {
    return new Promise(async (resolve, reject) => {
        if (!id || !name) {
            reject('Invalid data');
            return false;
        }

        const user = {
            identification,
            phone,
            name,
            lastName,
            address,
            city,
            department,
            neighborhood,
            photo,
            password,
            role,
        }

        const result = await store.update(id, user);

        resolve(result);
    })
}

function addUserData(token, nameSurname, telephone, department, city, address, observations) {
    return new Promise(async (resolve, reject) => {
        if (!token || !nameSurname || !telephone || !department || !city || !address || !observations) {
            reject('Invalid data');
            return false;
        }

        const result = await store.addUserData(token, nameSurname, telephone, department, city, address, observations);
        resolve(result);
    })
}

module.exports = {
    getUsers,
    addUser,
    addCustomer,
    getUser,
    getUserById,
    getUserByToken,
    deleteUser,
    updateUser,
    addUserData,
    authUser
}