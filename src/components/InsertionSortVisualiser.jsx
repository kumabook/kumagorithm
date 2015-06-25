var React          = require('react');
var InsertionSort  = require('../InsertionSort');
var SortVisualiser = require('./SortVisualiser');
var InsertionSortVisualiser = React.createClass({
  mixins: [SortVisualiser],
  getDefaultProps: function() {
    return {
      sort: InsertionSort
    };
  }
});

module.exports = InsertionSortVisualiser;
