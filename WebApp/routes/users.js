function users(userController){
  var express = require('express');
  var router = express.Router();

  /* GET users listing. */
  router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    userController.AddUser(userName);
    res.end();
  });

  return router;
}

module.exports = exports = users;
