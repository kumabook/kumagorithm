/**
 * Create a stack
 * @constructor
 * @param params parameter
 * @param params.capacity initial interal array size.
 * @classdesc Represent a LIFO stack with resizing array.
 */
var Stack = function(_params) {
  var params    = _params || {};
  this.capacity = params.capacity || 2;
  this.buffer   = new Int8Array(new ArrayBuffer(this.capacity));
  this.size     = 0;
};

/**
 * Returns the size of items.
 * @returns {Number}
 */
Stack.prototype.getSize = function() {
  return this.size;
};

/**
 * Returns the capacity of internal array.
 * @returns {Number}
 */
Stack.prototype.getCapacity = function() {
  return this.capacity;
};

/**
 * Is this stack empty?
 * @returns {Boolean}
 */
Stack.prototype.isEmpty = function() {
  return this.size == 0;
};

Stack.prototype.resize = function(capacity) {
  this.capacity = capacity;
  var temp = new Int8Array(new ArrayBuffer(capacity));
  for (var i = 0; i < this.size; i++) {
    temp[i] = this.buffer[i];
  }
  this.buffer = null;
  this.buffer = temp;
};

/**
 * push an item.
 * @param {*} val item.
 */
Stack.prototype.push = function(val) {
  var l = this.capacity;
  if (this.size == l) this.resize(2 * l);
  this.buffer[this.size++] = val;
};

/**
 * pop an item.
 * @returns {*} val item.
 */
Stack.prototype.pop = function() {
  var l = this.capacity;
  var v = this.buffer[this.size - 1];
  this.size--;
  if (this.size > 0 && this.size == l / 4) this.resize(l / 2);
  return v;
};
/**
 * Returns (but does not remove) the last-in item.
 */
Stack.prototype.peek = function() {
  return this.buffer[this.size - 1];
};

Stack.prototype.get = function(index) {
  return this.buffer[index];
};

Stack.prototype.toString = function() {
  return 'Stack: ' + this.capacity;
};

module.exports = Stack;
