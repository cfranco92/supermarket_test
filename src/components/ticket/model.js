const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    products: [
        {
            type: Schema.ObjectId,
            ref: 'Product'
        }
    ],
    Store: {
        type: Schema.ObjectId,
        ref: 'Store'
    },
    buyer: {
        type: Schema.ObjectId,
        ref: 'User' 
    },
    totalOrder: Number,
    date: Date
});

const model = mongoose.model('Ticket', myShema);
module.exports = model;