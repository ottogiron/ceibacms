var Handlebars = require('handlebars');



var includeComponentHelper = function(options){
   var path = options.hash.path;
   var ctype = options.hash.ctype;
   var data = options.data.root;
   //TODO: Utilitary module for getting meta info of component. This might be fixed implementing an actual component class
   var pathTokens = ctype.split('/');
   var moduleName = pathTokens[3];
   var componentName = pathTokens[pathTokens.length -1];
   var webComponentName = moduleName + '-' + componentName;
   data.dependencies.push(ctype);
   return new Handlebars.SafeString(
     "<" + webComponentName + "></" + webComponentName + ">"
   );
};




module.exports = function(){
  return {
      ceibaInclude: includeComponentHelper
  }
}
