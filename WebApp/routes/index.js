function index(unitController){

  var express = require('express');
  var router = express.Router();
  var ejs = require('ejs');

  /* GET home page. */
  router.get('/', function(req, res, next) {
    var ldrList = unitController.GetUnitLeaders();
    command = 'Command';
    var commandList = [];
    for(var i=0,l=ldrList.length;i<l;i++){
      commandList.push(unitController.GetUnitNameOfLeader(ldrList[i]));
    }

    console.log(commandList);
    res.render('partials/index', { title: 'RTAT', Command:command, ChildUnits:commandList});
  });


  return router;
}


  

module.exports = exports = index;
