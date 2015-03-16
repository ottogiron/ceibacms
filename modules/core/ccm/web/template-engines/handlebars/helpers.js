var Handlebars = require('handlebars');

var includeComponentHelper = function(path){
   console.log(path);
};


module.exports = function(){

  return {
      includeComponent: includeComponentHelper
  }
}
