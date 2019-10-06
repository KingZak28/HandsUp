'use strict';
module.exports = function(array) {
 var i = 0;
 i = Math.floor(Math.random() * array.length);
 return(array[i]);
};
