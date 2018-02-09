var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type:String, 
        requred: true,
        unique: true,
    },
    handle: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    } 
});
var userModel = mongoose.model('user', userSchema);


module.exports= userModel;