const React          = require('react');
const QuickSort      = require('../algorithm/QuickSort');
const SortVisualiser = require('./SortVisualiser');

const QuickSortVisualiser = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    MAX: React.PropTypes.number,
  },
  mixins: [SortVisualiser],
  getDefaultProps() {
    return { sort: QuickSort };
  },
  render() {
    const width  = this.props.width;
    const height = this.props.height;
    const MAX    = this.props.MAX;
    const items  = this.renderItems();
    return (
      <div>
        {this.getController()}
        <br />
        <svg
          width={this.state.array.length * width}
          height={height * MAX}
        >
          {items}
        </svg>
      </div>
    );
  },
});

module.exports = QuickSortVisualiser;
