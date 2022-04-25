'use strict';

var mongoose = require('mongoose')
var NFT = mongoose.model('nft');
const fs = require('fs')
const FormData = require('form-data');

const axios = require('axios');
const Web3 = require('web3')
const nftABI = require("../../abi/nftABI.json")
const nftAddr = "0xc871BeD55f7451C793d53d3e27554c58EE8DE0Ed"
require('dotenv').config();

delete process.env['http_proxy'];
delete process.env['HTTP_PROXY'];
delete process.env['https_proxy'];
delete process.env['HTTPS_PROXY'];

async function mint(hash) {
	if (typeof web3 !== 'undefined') {
		var web3 = new Web3(web3.currentProvider); 
	} else {
		var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	}
	const nftContract = new web3.eth.Contract(nftABI, nftAddr);
	let userWalletAddr = await web3.eth.getAccounts()
	const tx = await nftContract.methods.mint(hash).send({from: userWalletAddr[0], gas: 3000000})
	return tx
}

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
	let fileName = req.body.title + '_' + getDateName() + '.jpeg'
	let filePath = process.env.PWD + '/files/' + fileName 
	
	let imageFile = req.files.file;
	await imageFile.mv(filePath, async (err) => {
		if (err) {
			console.log('Error: failed to download file')
			return res.status(500).send(err);
		}
	});

	const ipfsURL = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
	let data = new FormData();
	data.append('file', fs.createReadStream('./files/'+fileName));

	let response = await axios.post(ipfsURL, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
        }
    })
	const hash = response.data.IpfsHash
	console.log('pinata hash : ', hash)
	let mintTransaction
	if(hash !== null) 
		mintTransaction = await mint(hash)
	console.log('contract transaction: ', mintTransaction.transactionHash)
	if(mintTransaction.transactionHash !== null) {
		req.body.ipfsHash = hash

		var newNft = new NFT(req.body)
		newNft.save(function(err, nft) {
			if(err)
				res.send(err)
			res.json(nft)
		})
	}
}
