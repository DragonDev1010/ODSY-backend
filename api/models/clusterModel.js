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
    created: {type: Date, default: Date.now},

    newAndUpcoming: {type: Boolean, default: false} // property for `New & Upcoming` section on landing page
})

module.exports = mongoose.model('cluster', ClusterSchema)