'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OfferSchema = new Schema({
    nft_id: Number,
    offerPrice: {type: Number, default: 0},
    offerCreator: String,
    expireDay: {type: Number, default: 3}, // 3 Day
    state: {type: Number, default: 0}, // {0: open, 1: accepted, 2: declined}
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('offer', OfferSchema)