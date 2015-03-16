var templateManager = require('../../../api/templating/template-manager');

var Handlebars = require('handlebars');
var helpers = require('./helpers')();
var jsdom  = require('jsdom');



function registerHelpers(){
  Object.keys(helpers).forEach(function(key){
    var helperDefinition = helpers[key];
    Handlebars.registerHelper(key, helperDefinition);
  });
}

function wireDependencies(html, dependencies){

  var window = jsdom.jsdom(html).defaultView;
  var $ = require('jquery')(window);

  var $html = $('html');

  if(!$html.find('head').length){
     $html.prepend('<head></head>');
  }
  var $head = $html.find('head');

  //TODO: This should depende on the component type webcompoent, angular, etc
  dependencies.forEach(function(dependencyPath){
    $head.prepend('<link rel="import" href="'+ dependencyPath +'/component.html" >');
  });

  return '<html>'+ $html.html() + '<html>';

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
    var wiredHTML = wireDependencies(html, dependencies);
    cb(null, wiredHTML);
  });
};
