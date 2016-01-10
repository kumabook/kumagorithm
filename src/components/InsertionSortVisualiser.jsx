var React          = require('react');
var InsertionSort  = require('../InsertionSort');
var SortVisualiser = require('./SortVisualiser');
var InsertionSortVisualiser = React.createClass({
  mixins: [SortVisualiser],
  getDefaultProps: function() {
    return {
      sort: InsertionSort
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
          {this.renderItems()}
        </svg>
      </div>
    );
  }
});

module.exports = InsertionSortVisualiser;
