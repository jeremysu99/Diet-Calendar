const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Example for foodSchema. Maybe add dining hall or image?
const dateSchema = new Schema({
    month: Number,
    day: Number,
    year: Number,
    foodItems: [{
        name: String,
        amount: String,
        calories: Number,
    }]
});

const dateModel = mongoose.model('dateModel', dateSchema);
module.exports = dateModel;