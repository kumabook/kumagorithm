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
  }
});

module.exports = ShellSortVisualiser;
