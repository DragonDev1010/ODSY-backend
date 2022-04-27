'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    wallet: String,
    name: String,
    favIds: Array,
    
    avatar: { data: Buffer, contentType: String}
})
module.exports = mongoose.model('user', UserSchema)