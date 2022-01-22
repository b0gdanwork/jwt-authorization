const {model, Schema} = require("mongoose");

const user_model = new Schema({
    // id: {type: String, unique: true, default: Date.now()},
    // name:  {String, required: true},
    email:   {type:String, unique: true, required: true},
    activationLink: {type: String, required: true},
    isActivated: {type: Boolean, required: true, default: false},
    password: String,
});

module.exports = model('User', user_model)