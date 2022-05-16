'use strict'
module.exports = function(app) {
    var controller = require('../controllers/userController')

    app.route('/users')
        .post(controller.createUser)
        .get(controller.getUser)
    app.route('/user/:wallet')
        .put(controller.updateUser)
        .get(controller.getUser)
}