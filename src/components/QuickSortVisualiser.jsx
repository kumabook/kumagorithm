var React          = require('react');
var QuickSort  = require('../QuickSort');
var SortVisualiser = require('./SortVisualiser');
var QuickSortVisualiser = React.createClass({
  mixins: [SortVisualiser],
  getDefaultProps: function() {
    return {
      sort: QuickSort
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

module.exports = QuickSortVisualiser;
