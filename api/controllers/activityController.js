'use strict';

var mongoose = require('mongoose')
var Activity = mongoose.model('activity');

exports.createActivity = async function(req, res) {
    var activityTemp = new Activity(req.body)
    activityTemp.save(function(err, cluster) {
        if(err)
            res.send(err)
        res.json(cluster)
    })
}

exports.getActivities = async function(req, res) {
    Activity.find(
		function(err, activities) {
			if (err)
				res.send(err);
			res.json(activities);
		}
	)
}