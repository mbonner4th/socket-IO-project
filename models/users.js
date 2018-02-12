var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
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
    }, 
    following: [{
        type: ObjectId, 
        ref: 'user',
    }], 
});
var userModel = mongoose.model('user', userSchema);


module.exports= userModel;