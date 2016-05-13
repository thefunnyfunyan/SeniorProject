function units(io, unitController){
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
        var ldrList = unitController.GetUnitLeaders();
        var unitList = [];
        for(var i=0;i<ldrList.length;i++){
            if(unitController.GetUnitNameOfLeader(ldrList[i])!=req.params.UnitName)
                unitList.push(unitController.GetUnitNameOfLeader(ldrList[i]));
        }
        var CommandUnit = req.params.UnitName;
        io.emit('update-Leaderboard', {Commander: CommandUnit, Leaders: unitList});
        io.emit('clear-map');
        res.end();
    });

    router.post('/:UnitName/All', function(req, res, next){
        unitController.SetAllChildUnitsActive(req.params.UnitName);
        var ldrList = unitController.GetUnitLeaders();
        console.log(ldrList);
        io.emit('update-Leaderboard', {Commander: req.params.UnitName, Leaders: ldrList});
        res.end();
    });

    return router;
}

module.exports = exports = units;
