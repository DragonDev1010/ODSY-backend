'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ActivitySchema = new Schema({
    id:Number,
    nft_id: Number,
    price: Number,
    activity_type: {type: Number, default: 0}, // {0: mint, 1: sale, 2: auction}
    creator: String, // wallet address
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('activity', ActivitySchema)