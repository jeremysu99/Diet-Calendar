const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Example for foodSchema. Maybe add dining hall or image?
const userSchema = new Schema({
    username: String,
    password: String
});

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;