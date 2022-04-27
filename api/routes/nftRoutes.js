'use strict'
module.exports = function(app) {
    var controller = require('../controllers/nftController')

    app.route('/nft/:nftId')
        .put(controller.updateNft)

    app.route('/nfts')
        .post(controller.createNft)
        .get(controller.getNfts)
}