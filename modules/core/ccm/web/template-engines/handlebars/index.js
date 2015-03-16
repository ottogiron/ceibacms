var templateManager = require('../../../api/templating/template-manager');

var Handlebars = require('handlebars');
var helpers = require('./helpers')();

function registerHelpers(){
  Object.keys(helpers).forEach(function(key){
    var helperDefinition = helpers[key];
    Handlebars.registerHelper(key, helperDefinition);
  });
}

module.exports = function(pageNode, store, cb) {
  registerHelpers();

  templateManager.loadTemplate(pageNode, function(err, htmlSource){
    if(err){return cb(err);}
    var dependencies = [];
    var context = {
      page: pageNode,
      dependencies: dependencies,
      store: store
    };
    var template = Handlebars.compile(htmlSource);
    var html = template(context);
    cb(null, html);
  });
};
