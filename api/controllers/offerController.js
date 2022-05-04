'use strict';

var mongoose = require('mongoose')
var Offer = mongoose.model('offer');

exports.createOffer = async function(req, res) {
    var newOffer = new Offer(req.body)
    newOffer.save(function(err, offer) {
        if(err)
            res.send(err)
        res.json()
    })
}

exports.getOffer = function(req, res) {
    let tokenId = req.params.tokenId // type string tokenId
    let query
    if (tokenId !== undefined) 
        query = {nft_id: tokenId}
    else
        query = {}

    Offer.find(
        query,
        function(err, offers) {
            if(err)
                res.send(err)
            res.json(offers)
        }
    )
}