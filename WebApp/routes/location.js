function create(io, locationController){

    var express = require('express'),
        router = express.Router();

    router.get('/', function(req, res){
        res.render('partials/location', {title: 'location'});
    });

    router.post('/', function(req, res){
        var lat = req.body.lat,
            long = req.body.long,
            userId = req.body.userVal;
        locationController.AddUserLocation(userId, {'lat': lat, 'lng': long}, function(){
            io.emit('device-location', {id: userId, lat: lat, long: long});
            res.render('partials/location', {title: 'location'});
        }, function(){res.end();});
    });

    router.post('/update', function(req, res){
        locationController.PostActiveUsersLocations(function(lat, lng, userId){
            io.emit('device-location', {id: userId, lat: lat, long: lng});
        })
    });

    return router;

}

module.exports = create;