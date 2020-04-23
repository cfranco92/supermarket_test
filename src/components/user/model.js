const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    identification: Number,
    token: String,
    telephone: String,
    nameSurname: String,
    address: String,
    city: String,
    department: String,
    neighborhood: String,
    photo: String,
    password: String,
    observations: String,
    date: Date,
    role: String
});

const model = mongoose.model('User', myShema);
module.exports = model;