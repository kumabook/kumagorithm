var React          = require('react');
var ShellSort      = require('../ShellSort');
var SortVisualiser = require('./SortVisualiser');
var ShellSortVisualiser = React.createClass({
  mixins: [SortVisualiser],
  getDefaultProps: function() {
    return {
      sort: ShellSort
    };
  },
  getExtra: function() {
    var h = this.state.value.h ? this.state.value.h : '?';
    return <div>{h}-sort</div>
  },
  render: function() {
    var width = this.props.width
    var height = this.props.height
    var MAX = this.props.MAX;
    var extra = null
    if (this.getExtra) {
      extra = this.getExtra();
    }
    return (
      <div>
        {this.getController()}
        {extra}
        <br/>
        <svg ref="svg"
             width={this.state.array.length * width}
             height={height * MAX}>
        </svg>
      </div>
    );
  }
});

module.exports = ShellSortVisualiser;
