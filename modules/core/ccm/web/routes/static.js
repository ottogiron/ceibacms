var express = require('express');
var router = express.Router();
var path = require('path');

var templateEngines;
var store;
/* GET users listing. */
router.get(/\/(.*)(styles|scripts)\/.*\.(js|css)/, function(req, res, next) {
    var rootPath = path.join(__dirname, '../../../../../','modules/user')
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



module.exports = function(){

  return router;
};
