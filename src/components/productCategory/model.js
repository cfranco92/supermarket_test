const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myShema = new Schema({
    category: String,
    store: {
        type: Schema.ObjectId,
        ref: 'Store' 
    },
    photo: String,
    date: Date
});

const model = mongoose.model('ProductCategory', myShema);
module.exports = model;