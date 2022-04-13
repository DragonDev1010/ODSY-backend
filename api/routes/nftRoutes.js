'use strict'
module.exports = function(app) {
    var nftList = require('../controllers/nftController')

    app.route('/nfts')
        .post(nftList.create_a_nft) 
}