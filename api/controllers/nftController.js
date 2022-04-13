'use strict';

var mongoose = require('mongoose')
var NFT = mongoose.model('nft');
const fs = require('fs')
const {create} = require('ipfs-http-client')
const ipfs = create('http://localhost:5001')

function getDateName() {
	let curDate = new Date()
	let year = curDate.getFullYear().toString()
	let month = (curDate.getMonth()+1).toString()
	if(curDate.getMonth() < 9 ) month = '0' + month;
	let date = curDate.getDate().toString() 
	if(curDate.getDate() < 10 ) date = '0' + date;
	let hour = curDate.getHours().toString()
	if(hour < 10 ) hour = '0' + hour;
	let min = curDate.getMinutes().toString() 
	if(curDate.getMinutes() < 10) min = '0' + min;
	let sec = curDate.getSeconds().toString()
	if(curDate.getSeconds() < 10 ) sec = '0' + sec;
	return (year + month + date + hour + min + sec)
}

exports.create_a_nft = async function(req, res) {
	let fileName = req.body.name + '_' + getDateName() + '.jpeg'
	let filePath = process.env.PWD + '/files/' + fileName 
	
	let imageFile = req.files.file;
	imageFile.mv(filePath, async (err) => {
		if (err) {
			console.log('Error: failed to download file')
			return res.status(500).send(err);
		}
	});

	req.body.imgURL = fileName
	let img = {
		data: fs.readFileSync(filePath),
		contentType: 'image/jpg'
	}
	
	req.body.img = img
	req.body.created = new Date()

	var newNft = new NFT(req.body)
	newNft.save(function(err, nft) {
		if(err)
			res.send(err)
		res.json(nft)
	})

}
