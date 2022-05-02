'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var NFTSchema = new Schema({
    nft_id: Number,

    title: String,
    description: String,
    saleMethod: Number,
    price: Number,
    chainId: Number, // {1: bnb, 2: eth, 3: poly, 4: sol}
    curType: Number, // {0: native token, 1: $ODSY}
    royalty: Number,
    size: Number,
    collect: Number,

    creatorAddr: String,
    ownerAddr: String,
    created: {type: Date, default: Date.now},

    ipfsHash: String,

    // favUsers: [String],
    followerCnt: {type: Number, default: 0},
    img: { data: Buffer, contentType: String}
})
module.exports = mongoose.model('nft', NFTSchema)