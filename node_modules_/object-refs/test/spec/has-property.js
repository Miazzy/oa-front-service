'use strict';

module.exports = function(element, property) {
  return Object.prototype.hasOwnProperty.call(element, property);
};