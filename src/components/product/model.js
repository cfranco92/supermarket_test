const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    name: String,
    costPrice: Number,
    sellerPrice: Number,
    publicPrice: Number,
    description: String,
    photo: String,
    categories: [{
        type: Schema.ObjectId,
        ref: 'ProductCategory' 
    }],
    stores: [{
        type: Schema.ObjectId,
        ref: 'Store' 
    }],
    factory: {
        type: Schema.ObjectId,
        ref: 'Factory' 
    },
    date: Date
});

const model = mongoose.model('Product', myShema);
module.exports = model;