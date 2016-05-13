function users(userController, unitController, io){
  var express = require('express');
  var router = express.Router();

  /* GET users listing. */
  router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    userController.AddUser(userName);
    res.end();
  });
  
  router.post('/All', function(req, res){
    unitController.SetAllUnitsActive();
    var ldrList = unitController.GetUnitLeaders();
    var unitList = [];
    for(var i=0;i<ldrList.length;i++){
      if(unitController.GetUnitNameOfLeader(ldrList[i])!='Command')
        unitList.push(unitController.GetUnitNameOfLeader(ldrList[i]));
    }
    io.emit('update-Leaderboard', {Commander: 'Command', Leaders: unitList});
    res.end();
  })

  return router;
}

module.exports = exports = users;
