const {model, Schema} = require("mongoose");

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: Boolean, required: true},
});

module.exports = model('Token', TokenSchema)