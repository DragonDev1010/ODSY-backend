'use strict';

var mongoose = require('mongoose')
var User = mongoose.model('user');

exports.updateUser = function(req, res) {
    User.findOneAndUpdate(
        {wallet: { $regex : new RegExp(req.params.wallet, "i") }}, // Tag `i` sets case-insenitive
        req.body,
        {new: true},
        function(err, user) {
            if (err)
              res.send(err);
            res.json(user);
        }
    )
}

exports.getUserInfo = function(req, res) {
    User.find(
        {wallet: { $regex : new RegExp(req.params.wallet, "i") }}, // Tag `i` sets case-insenitive
        function(err, user) {
            if (err)
                res.send(err)
            res.json(user)
        }
    )
}