const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    name: String,
    logo: String,
    city: String,
    department: String,
    seller: {
        type: Schema.ObjectId,
        ref: 'User' 
    },
    neighborhood: String,
    orders: [{
        type: Schema.ObjectId,
        ref: 'Order_Detail' 
    }],
    date: Date
});

const model = mongoose.model('Store', myShema);
module.exports = model;