var React          = require('react');
var SelectionSort  = require('../SelectionSort');
var SortVisualiser = require('./SortVisualiser');
var SelectionSortVisualiser = React.createClass({
  mixins: [SortVisualiser],
  getDefaultProps: function() {
    return {
      sort: SelectionSort
    };
  },
  render: function() {
    var width = this.props.width
    var height = this.props.height
    var MAX = this.props.MAX;
    return (
      <div>
        {this.getController()}
        <br/>
        <svg ref="svg"
             width={this.state.array.length * width}
             height={height * MAX}>
        </svg>
      </div>
    );
  }
});

module.exports = SelectionSortVisualiser;
