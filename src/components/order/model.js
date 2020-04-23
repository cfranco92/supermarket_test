const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    products: [
        {
            type: Schema.ObjectId,
            ref: 'Order_Detail',
            autopopulate: true
        }
    ],
    customer: String,
    status: String,
    totalOrder: Number,
    token: String,
    date: Date
});

myShema.plugin(require('mongoose-autopopulate'));
const model = mongoose.model('Order', myShema);
module.exports = model;