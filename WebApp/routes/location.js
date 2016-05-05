function create(io){

    var express = require('express'),
        router = express.Router();

    router.get('/', function(req, res){
        res.render('partials/location', {title: 'location'});
    });

    router.post('/', function(req, res){
        var lat = req.body.lat,
            long = req.body.long,
            userId = req.cookies.userVal;
        console.log('lat ' + lat + ' long: '+ long);
        io.emit('device-location', {id: userId, lat: lat, long: long});
        res.render('partials/location', {title: 'location'});
    });

    return router;

}

module.exports = create;