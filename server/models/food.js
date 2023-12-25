const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Example for foodSchema. Maybe add dining hall or image?
const foodSchema = new Schema({
    name: String,
    amount: String,
    calories: Number,
});

const foodModel = mongoose.model('foodModel', foodSchema);
module.exports = foodModel;