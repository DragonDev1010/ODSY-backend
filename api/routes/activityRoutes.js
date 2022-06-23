'use strict'

module.exports = function(app) {
    var controller = require('../controllers/activityController')

    app.route('/activities')
        .post(controller.createActivity)
}