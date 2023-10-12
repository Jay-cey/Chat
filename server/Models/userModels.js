const mongoose = require('mongoose');


//creatimg a new user object
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 30},
    email: {type: String, required: true, minlength: 3, maxlength: 300, unique: true},
    password: {type: String, required: true, minlength: 3, maxlength: 1024},
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
},
{
    timestamps: true,
});


const userModel = mongoose.model('User', userSchema);


//export module
module.exports = userModel;