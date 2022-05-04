'use strict';

const fs = require('fs')
var mongoose = require('mongoose')
var Cluster = mongoose.model('cluster');
var getDateName = require('../getDateName')

// function getDateName() {
// 	let curDate = new Date()
// 	let year = curDate.getFullYear().toString()
// 	let month = (curDate.getMonth()+1).toString()
// 	if(curDate.getMonth() < 9 ) month = '0' + month;
// 	let date = curDate.getDate().toString() 
// 	if(curDate.getDate() < 10 ) date = '0' + date;
// 	let hour = curDate.getHours().toString()
// 	if(hour < 10 ) hour = '0' + hour;
// 	let min = curDate.getMinutes().toString() 
// 	if(curDate.getMinutes() < 10) min = '0' + min;
// 	let sec = curDate.getSeconds().toString()
// 	if(curDate.getSeconds() < 10 ) sec = '0' + sec;
// 	return (year + month + date + hour + min + sec)
// }

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