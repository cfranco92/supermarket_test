const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    name: String,
    logo: String,
    city: String,
    department: String,
    producer: {
        type: Schema.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    neighborhood: String,
    orders: [{
        type: Schema.ObjectId,
        ref: 'Order',
        autopopulate: true
    }],
    date: Date
});

const model = mongoose.model('Factory', myShema);
myShema.plugin(require('mongoose-autopopulate'));
module.exports = model;