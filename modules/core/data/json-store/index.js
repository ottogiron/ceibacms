var Confidence = require('confidence');
var fs = require('fs');
var path = require('path');
var store = new Confidence.Store();
var options;


function getNode(path){
   return store.get(path);
}


module.exports = function(options){
  console.log(path.resolve(options.file));

  var repoJSON = fs.readFileSync(options.file, {encoding: 'utf8'});
  var repo = JSON.parse(repoJSON);
  store.load(repo);

  return {
    getNode: getNode
  }
}
