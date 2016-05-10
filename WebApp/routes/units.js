function units(unitController){
    var express = require('express');
    var router = express.Router();

    /* GET users listing. */
    router.get('/', function(req, res, next) {
        res.render('partials/unit', {title: 'Unit Creation'});
    });

    router.post('/', function(req, res){
        var unitName = req.body.unitName,
            leaders = req.body.leaders,
            parentUnit = req.body.parentUnitName;
            unitController.AddUnitToParent(unitName, leaders, parentUnit);
        res.render('partials/unit', {title: 'Unit Creation'});
    })

    router.post('/:UnitName', function(req, res, next){
        unitController.SetSingleActiveUnit(req.params.UnitName);
        res.end();
    })

    return router;
}

module.exports = exports = units;
