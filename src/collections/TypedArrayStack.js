/**
 * Create a stack
 * @constructor
 * @param params parameter
 * @param params.capacity {int} initial interal array size.
 * @param params.type {TypedArray} item type. default: Int16Array
 * @class desc Represent a LIFO stack with resizing array.
 */
var Stack = function(_params) {
  var params    = _params || {};
  this.type     = params.type || Int16Array;
  this.capacity = params.capacity || 2;
  this.array    = this.allocate(this.capacity);
  this.size     = 0;
};

Stack.prototype.allocate = function(size) {
  return new this.type(new ArrayBuffer(size * this.type.BYTES_PER_ELEMENT));
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
  var temp = this.allocate(capacity);
  for (var i = 0; i < this.size; i++) {
    temp[i] = this.array[i];
  }
  this.array = temp;
};

/**
 * push an item.
 * @param {*} val item.
 */
Stack.prototype.push = function(val) {
  var l = this.capacity;
  if (this.size == l) this.resize(2 * l);
  this.array[this.size++] = val;
};

/**
 * pop an item.
 * @returns {*} val item.
 */
Stack.prototype.pop = function() {
  var l = this.capacity;
  var v = this.array[this.size - 1];
  this.size--;
  if (this.size > 0 && this.size == l / 4) this.resize(l / 2);
  return v;
};
/**
 * Returns (but does not remove) the last-in item.
 */
Stack.prototype.peek = function() {
  return this.array[this.size - 1];
};

Stack.prototype.get = function(index) {
  return this.array[index];
};

Stack.prototype.toString = function() {
  return 'Stack: ' + this.capacity;
};

module.exports = Stack;
