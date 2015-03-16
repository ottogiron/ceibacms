var templateManager = require('../../../api/templating/template-manager');

var Handlebars = require('handlebars');
var helpers = require('./helpers')();

function registerHelpers(){
  Object.keys(helpers).forEach(function(key){
    var helperDefinition = helpers[key];
    Handlebars.registerHelper(key, helperDefinition);
  });
}

module.exports = function(pageNode, cb) {
  registerHelpers();
  
  templateManager.loadTemplate(pageNode, function(err, htmlSource){
    if(err){return cb(err);}
    var context = {
      page: pageNode
    };
    var template = Handlebars.compile(htmlSource);
    var html = template(context);
    cb(null, html);
  });
};
