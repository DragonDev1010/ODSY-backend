'use strict';

const fs = require('fs')
var mongoose = require('mongoose')
var Cluster = mongoose.model('cluster');
var getDateName = require('../getDateName')

exports.createCluster = async function (req, res) {
    let clusterName = req.body.name + '_' + getDateName() + '.jpeg'
	let filePath = process.env.PWD + '/files/collection/' + clusterName 
	
	let logoFile = req.files.logo;
	await logoFile.mv(filePath, async (err) => {
		if (err) {
			console.log('Error: failed to download file')
			return res.status(500).send(err);
		}

        req.body.logoImg = {
            data: fs.readFileSync(filePath),
            contentType: 'image/jpeg'
        }

        var clusterTemp = new Cluster(req.body)
        clusterTemp.save(function(err, cluster) {
            if(err)
                res.send(err)
            res.json(cluster)
        })
	})
}

exports.getClusters = function (req, res) {
    let filters = req.query
	let params = req.params.collectionId
	let query;
	if (params != undefined)
		query = {id: params}
	else
		query = {}
	
	Cluster.find(
		query,
		function(err, nfts) {
			if (err)
				res.send(err);
			res.json(nfts);
		}
	)
}