var express = require('express');
var router = express.Router();


var templateEngines;
var store;
/* GET users listing. */
router.get('/:path(*\.html)', function(req, res, next) {
  var pageNodePath = getNodePath(req.path);
  var pageNode = store.getNode(pageNodePath);
  var engine = pageNode.content.engine;
  var templateEngine = templateEngines[engine];
  templateEngine(pageNode,store,function(err, html){
    res.send(html);
  });

});

function getTemplateEngine(id){
  return templateEngines[id];
}


function getNodePath(requestPath){
  var pathTokens = requestPath.split('.html');
  return '/content/sites' + pathTokens[0];
}

module.exports = function(options){
  templateEngines = options.templateEngines;
  store = options.store;
  return router;
};
