'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var NFTSchema = new Schema({
    nft_id: Number,

    title: String,
    description: String,
    saleMethod: Number,
    price: Number,
    curType: Number,
    royalty: Number,
    size: Number,
    collect: Number,

    creatorAddr: String,
    ownerAddr: String,
    created: Date,

    ipfsHash: String,

    favUsers: [String],
    img: { data: Buffer, contentType: String}
})
module.exports = mongoose.model('nft', NFTSchema)