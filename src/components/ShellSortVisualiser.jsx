const React          = require('react');
const ShellSort      = require('../algorithm/ShellSort');
const SortVisualiser = require('./SortVisualiser');

const ShellSortVisualiser = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    MAX: React.PropTypes.number,
  },
  mixins: [SortVisualiser],
  getDefaultProps() {
    return { sort: ShellSort };
  },
  getExtra() {
    const h = this.state.value.h ? this.state.value.h : '?';
    return <div>{h}-sort</div>;
  },
  render() {
    const width  = this.props.width;
    const height = this.props.height;
    const MAX    = this.props.MAX;
    let extra  = null;
    if (this.getExtra) {
      extra = this.getExtra();
    }
    return (
      <div>
        {this.getController()}
        {extra}
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

module.exports = ShellSortVisualiser;
