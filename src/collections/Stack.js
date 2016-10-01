/**
 * Create a stack
 * @constructor
 * @class desc Represent a LIFO stack with resizing array.
 */
var Stack = function() {
  this.array = [];
  this.size  = 0;
};

/**
 * Returns the size of items.
 * @returns {Number}
 */
Stack.prototype.getSize = function() {
  return this.array.length;
};

/**
 * Returns the capacity of internal array.
 * @returns {Number}
 */
Stack.prototype.getCapacity = function() {
  return this.getSize();
};

/**
 * Is this stack empty?
 * @returns {Boolean}
 */
Stack.prototype.isEmpty = function() {
  return this.array.length == 0;
};

/**
 * push an item.
 * @param {*} val item.
 */
Stack.prototype.push = function(val) {
  this.array.push(val);
};

/**
 * pop an item.
 * @returns {*} val item.
 */
Stack.prototype.pop = function() {
  return this.array.pop();
};
/**
 * Returns (but does not remove) the last-in item.
 */
Stack.prototype.peek = function() {
  return this.array[this.length - 1];
};

Stack.prototype.get = function(index) {
  return this.array[index];
};

Stack.prototype.toString = function() {
  return 'Stack: ' + this.array.length;
};

module.exports = Stack;
