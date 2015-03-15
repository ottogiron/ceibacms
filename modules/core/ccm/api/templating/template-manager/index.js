
var fs = require('fs');
var path = require('path');

function loadTemplate(pageNode, cb){

  var templatePath = pageNode.content.template;
  fs.readFile(path.join(__dirname,'../../../../../../', templatePath , 'index.html'), {
    encoding:'utf8'
  }, function(err, htmlSource){
    if(err) {return cb(err);}
      cb(null, htmlSource);
  });
}

module.exports =  {
      loadTemplate: loadTemplate
};
