'use strict'

module.exports = function(app) {
    var controller = require('../controllers/clusterController')

    app.route('/collects')
        .post(controller.createCluster)
}