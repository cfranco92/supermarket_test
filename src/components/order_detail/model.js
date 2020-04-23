const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    quantity: Number,
    store: {
        type: Schema.ObjectId,
        ref: 'Store',
        autopopulate: true
    },
    product: {
        type: Schema.ObjectId,
        ref: 'Product',
        autopopulate: true
    },
    cart: {
        type: Schema.ObjectId,
        ref: 'Shopping_Cart',
        autopopulate: true
    },
    customer: String,
    status: String,
    date: Date
});
myShema.plugin(require('mongoose-autopopulate'));
const model = mongoose.model('Order_Detail', myShema);
module.exports = model;