'use strict'

module.exports = function (app) {
    var controller = require('../controllers/offerController')

    app.route('/offers')
        .post(controller.createOffer)
}