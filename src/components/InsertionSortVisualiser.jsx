const React          = require('react');
const InsertionSort  = require('../algorithm/InsertionSort');
const SortVisualiser = require('./SortVisualiser');

const InsertionSortVisualiser = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    MAX: React.PropTypes.number,
  },
  mixins: [SortVisualiser],
  getDefaultProps: () => ({ sort: InsertionSort }),
  render() {
    const width  = this.props.width;
    const height = this.props.height;
    const MAX    = this.props.MAX;
    return (
      <div>
        {this.getController()}
        <br />
        <svg
          width={this.state.array.length * width}
          height={height * MAX}
        >
          {this.renderItems()}
        </svg>
      </div>
    );
  },
});

module.exports = InsertionSortVisualiser;
