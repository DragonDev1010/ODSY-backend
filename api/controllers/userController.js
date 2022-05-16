'use strict';

const fs = require('fs')
var mongoose = require('mongoose')
var User = mongoose.model('user');

var getDateName = require('../getDateName')

exports.createUser = function(req, res) {
    let userName = req.body.name + '_' + getDateName() + '.jpeg'
	let filePath = process.env.PWD + '/files/users/' + userName 
	
	let avatarFile = req.files.avatar;
	avatarFile.mv(filePath, async (err) => {
		if (err) {
			console.log('Error: failed to download file')
			return res.status(500).send(err);
		}

        req.body.avatar = {
            data: fs.readFileSync(filePath),
            contentType: 'image/jpeg'
        }

        var userTemp = new User(req.body)
        userTemp.save(function(err, cluster) {
            if(err)
                res.send(err)
            res.json(cluster)
        })
	})
}

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

exports.getUser = function(req, res) {
    let query = req.query
    query['wallet'] = { $regex : new RegExp(req.params.wallet, "i") }
    User.find(
        query,
        function(err, user) {
            if (err)
                res.send(err)
            res.json(user)
        }
    )
}