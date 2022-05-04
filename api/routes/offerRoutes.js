'use strict'

module.exports = function (app) {
    var controller = require('../controllers/offerController')

    app.route('/offers')
        .post(controller.createOffer)
        .get(controller.getOffer)
    app.route('/offers/:tokenId')
        .get(controller.getOffer)
}