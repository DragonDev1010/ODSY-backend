'use strict'

module.exports = function(app) {
    var controller = require('../controllers/clusterController')

    app.route('/collects')
        .post(controller.createCluster)
        .get(controller.getClusters)
    app.route('/collect/:collectId')
        .put(controller.updateCluster)
        .get(controller.getClusters)
}