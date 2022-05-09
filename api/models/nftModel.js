'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var NFTSchema = new Schema({
    nft_id: Number,

    title: String,
    description: String,
    saleMethod: {type: Number, default: 0},// {0: sale, 1: auction}
    price: Number,
    chainId: {type: Number, default: 0}, // {1: bnb, 2: eth, 3: poly, 4: sol}
    curType: {type: Number, default: 0}, // {0: native token, 1: $ODSY}
    royalty: {type: Number, default: 0},
    size: Number,
    collect: {type: Number, default: 0},

    creatorAddr: String,
    ownerAddr: String,
    created: {type: Date, default: Date.now},

    ipfsHash: String,

    // favUsers: [String],
    followerCnt: {type: Number, default: 0},
    img: { data: Buffer, contentType: String},

    // auctionEndsIn: {type: Date, default: new Date(+new Date() - 1000*60*60*24*365*100)}
    auctionEndsIn: {type: Date, default: new Date('1900-01-01T00:00:00.000Z')}
})
module.exports = mongoose.model('nft', NFTSchema)