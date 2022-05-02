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