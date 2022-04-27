'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var NFTSchema = new Schema({
    nft_id: Number,

    title: String,
    description: String,
    saleMethod: Number,
    price: Number,
    chainId: Number,
    curType: Number,
    royalty: Number,
    size: Number,
    collect: Number,

    creatorAddr: String,
    ownerAddr: String,
    created: Date,

    ipfsHash: String,

    // favUsers: [String],
    followerCnt: {type: Number, default: 0},
    img: { data: Buffer, contentType: String}
})
module.exports = mongoose.model('nft', NFTSchema)