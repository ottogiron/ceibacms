var express = require('express');
var router = express.Router();
var path = require('path');

var templateEngines;
var store;
var projectRoot =  '../../../../../';
/* GET users listing. */
router.get(/\/(.*)(styles|scripts)\/.*\.(js|css)/, function(req, res, next) {
    var rootPath = path.join(__dirname, projectRoot ,'modules/user')
    var options = {
      root: rootPath
    };

    var filePath = req.path;

    res.sendFile(filePath, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
});

router.get(/\/bower_components\/(.*\.(css|html|js))/, function(req, res, next){
  var rootPath = path.join(__dirname, projectRoot, 'bower_components')
  var options = {
    root: rootPath
  };
  var filePath = req.params[0]; //first regular expression match


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
