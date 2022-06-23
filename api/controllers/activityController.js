'use strict';

var mongoose = require('mongoose')
var Activity = mongoose.model('activity');

exports.createActivity = async function(req, res) {
    console.log('test')
    var activityTemp = new Activity(req.body)
    activityTemp.save(function(err, cluster) {
        if(err)
            res.send(err)
        res.json(cluster)
    })
}
