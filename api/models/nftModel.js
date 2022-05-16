'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var NFTSchema = new Schema({
    nft_id: Number,

    title: String,
    description: String,
    saleMethod: {type: Number, default: 0},// {0: sale, 1: auction, 2: new, 3: hasOffers}
    price: Number,
    chainId: {type: Number, default: 0}, // {1: bnb, 2: eth, 3: poly, 4: sol}
    curType: {type: Number, default: 0}, // {0: native token, 1: $ODSY}
    royalty: {type: Number, default: 0},
    collect: {type: Number, default: 0},
    size: Number,
    category: {type: Number, default: 0},

    creatorAddr: String,
    ownerAddr: String,
    created: {type: Date, default: Date.now},

    ipfsHash: String,

    // favUsers: [String],
    followerCnt: {type: Number, default: 0},
    img: { data: Buffer, contentType: String},

    // Auction Information
    auctionStartPrice: Number,
    auctionStartIn: {type: Date, default: new Date('1900-01-01T00:00:00.000Z')},
    auctionEndIn: {type: Date, default: new Date('1900-01-01T00:00:00.000Z')},
    auctionHighestBid: Number,
    auctionHighestBidder: String,

    goldMember: {type: Boolean, default: false}, // {true: gold-member, false: non-gold-member}

    // Properties
    properties: {type: Object}
})
module.exports = mongoose.model('nft', NFTSchema)