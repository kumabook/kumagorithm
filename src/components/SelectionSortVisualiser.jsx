const React          = require('react');
const SelectionSort  = require('../algorithm/SelectionSort');
const SortVisualiser = require('./SortVisualiser');

const SelectionSortVisualiser = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    MAX: React.PropTypes.number,
  },
  mixins: [SortVisualiser],
  getDefaultProps: () => ({ sort: SelectionSort }),
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

module.exports = SelectionSortVisualiser;
