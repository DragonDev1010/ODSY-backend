'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ClusterSchema = new Schema({
    id:Number,
    name: String,
    creator: String,
    volume: Number,
    verified: {type: Boolean, default: false},
    logoImg: { data: Buffer, contentType: String},
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('cluster', ClusterSchema)