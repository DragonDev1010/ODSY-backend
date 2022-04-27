'use strict';

var mongoose = require('mongoose')
var NFT = mongoose.model('nft');
const fs = require('fs')
const FormData = require('form-data');

const axios = require('axios');
const Web3 = require('web3')
const nftABI = require("../../abi/nftABI.json")
const nftAddr = "0x9315f69Bf5A6E7fA76a43BBc601499b714D17F5B"
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
// https://gateway.pinata.cloud/ipfs/QmPAd7oqiiCqi7Z6LRWzaz8vhZeJT4jxmckWWeXydJsQwu
exports.createNft = async function(req, res) {
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
	let pinataFormData = new FormData();
	let imageData = fs.createReadStream(filePath) 
	pinataFormData.append('file', imageData);

	axios.post(ipfsURL, pinataFormData, {
		maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
		headers: {
			'Content-Type': `multipart/form-data; boundary=${pinataFormData._boundary}`,
			pinata_api_key: process.env.PINATA_API_KEY,
			pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
		}
	})
		.then( pinataRes => {
			const hash = pinataRes.data.IpfsHash
			console.log('pinata hash : ', hash)
			req.body.ipfsHash = hash
			req.body.img = {
				data: fs.readFileSync(filePath),
				contentType: 'image/jpeg'
			}
			var newNft = new NFT(req.body)
			newNft.save(function(err, nft) {
				if(err)
					res.send(err)
				res.json(nft)
			})
		})
		.catch(e => console.error(e))
	// let mintTransaction
	// if(hash !== null) 
	// 	mintTransaction = await mint(hash)
	// console.log('contract transaction: ', mintTransaction.transactionHash)
	// console.log('mint transaction: ', mintTransaction.events.Transfer.returnValues.tokenId)
	// if(mintTransaction.transactionHash !== null) {
		// req.body.ipfsHash = hash
		// req.body.nft_id = mintTransaction.events.Transfer.returnValues.tokenId

		// var newNft = new NFT(req.body)
		// newNft.save(function(err, nft) {
		// 	if(err)
		// 		res.send(err)
		// 	res.json(nft)
		// })
	// }
}

exports.getNfts = async function(req, res) {
	let filters = req.query
	NFT.find(function(err, nfts) {
		if (err)
			res.send(err);
		res.json(nfts);
	})
}

exports.updateNft = async function(req, res) {
	NFT.findOneAndUpdate(
        {nft_id: req.params.nftId}, 
        req.body,
        {new: true},
        function(err, user) {
            if (err)
              res.send(err);
            res.json(user);
        }
    )
}