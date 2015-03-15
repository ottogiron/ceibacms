var templateManager = require('../../api/templating/template-manager');

var Handlebars = require('handlebars');

module.exports = function(pageNode, cb) {
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
