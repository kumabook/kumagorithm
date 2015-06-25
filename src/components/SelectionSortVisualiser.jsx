var React          = require('react');
var SelectionSort  = require('../SelectionSort');
var SortVisualiser = require('./SortVisualiser');
var SelectionSortVisualiser = React.createClass({
  mixins: [SortVisualiser],
  getDefaultProps: function() {
    return {
      sort: SelectionSort
    };
  }
});

module.exports = SelectionSortVisualiser;
