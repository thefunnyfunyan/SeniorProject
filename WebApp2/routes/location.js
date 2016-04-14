var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next){
    res.render('partials/location', {title: 'location'});
})

router.post('/', function(req, res){
    var lat = req.body.lat,
        long = req.body.long;
    console.log('lat ' + lat + ' long: '+ long);

})

module.exports = router;