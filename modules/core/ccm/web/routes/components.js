var express = require('express');
var router = express.Router();
var path = require('path');

var templateEngines;
var store;
var projectRoot =  '../../../../../';
/* GET users listing. */
router.get(/(\/.*\.html)/, function(req, res, next) {
    var rootPath = path.join(__dirname, projectRoot ,'modules/user')
    var options = {
      root: rootPath
    };

    var filePath = req.params[0];

    res.sendFile(filePath, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
});



module.exports = function(){
  return router;
};
