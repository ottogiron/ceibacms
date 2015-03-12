var templateEngines;
var store;

module.exports = function(options){
  templateEngines = options.templateEngines;
  store = options.store;

  return function(filePath, options, cb){
      var pageNode = store.getNode(options.pageNodePath);
      var engine = pageNode.content.engine;
      var templateEngine = templateEngines[engine];
      templateEngine(pageNode, cb);
  }
}
