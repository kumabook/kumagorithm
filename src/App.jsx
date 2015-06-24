var React                   = require('react');
var StackVisualiser         = require('./components/StackVisualiser');
var SelectionSortVisualiser = require('./components/SelectionSortVisualiser');

var App = React.createClass({
  render () {
    var Child;
    switch (this.props.route) {
      case 'stack':          Child = StackVisualiser; break;
      case 'selection-sort': Child = SelectionSortVisualiser; break;
      default:               Child = null;
    }
    return (
      <div>
        <h1>{this.props.route}</h1>
        <Child/>
      </div>
    );
  }
});

function render(container, route) {
  React.render(<App route={route} />, container);
};

var kumagorithm = {
  App: App,
  render: render
};

module.exports = kumagorithm;
