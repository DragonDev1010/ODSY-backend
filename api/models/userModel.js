'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: String,
    avatar: { data: Buffer, contentType: String},
    wallet: String,

    favIds: Array,
    created: { type: Date, default: Date.now }
})
module.exports = mongoose.model('user', UserSchema)