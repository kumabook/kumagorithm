var Stack = function(_params) {
  var params    = _params || {};
  this.capacity = params.capacity || 2;
  this.buffer   = new Int8Array(new ArrayBuffer(this.capacity));
  this.size     = 0;
};

Stack.prototype.getSize = function() {
  return this.size;
};

Stack.prototype.getCapacity = function() {
  return this.capacity;
};

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

Stack.prototype.push = function(val) {
  var l = this.capacity;
  if (this.size == l) this.resize(2 * l);
  this.buffer[this.size++] = val;
};

Stack.prototype.pop = function() {
  var l = this.capacity;
  var v = this.buffer[this.size - 1];
  this.size--;
  if (this.size > 0 && this.size == l / 4) this.resize(l / 2);
  return v;
};

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
