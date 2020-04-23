const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    products: [
        {
            type: Schema.ObjectId,
            ref: 'Order_Detail' 
        },
    ],
    customer: String,
    date: Date,
    total: Number
});

const model = mongoose.model('Shopping_Cart', myShema);
module.exports = model;