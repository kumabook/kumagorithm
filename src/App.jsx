const React                   = require('react');
const ReactDOM                = require('react-dom');
const StackVisualiser         = require('./components/StackVisualiser');
const SelectionSortVisualiser = require('./components/SelectionSortVisualiser');
const InsertionSortVisualiser = require('./components/InsertionSortVisualiser');
const ShellSortVisualiser     = require('./components/ShellSortVisualiser');
const MergeSortVisualiser     = require('./components/MergeSortVisualiser');
const QuickSortVisualiser     = require('./components/QuickSortVisualiser');

const App = React.createClass({
  propTypes: {
    route: React.PropTypes.string,
  },
  render() {
    /* eslint no-multi-spaces: 0 */
    let Child;
    switch (this.props.route) {
      case 'stack':          Child = StackVisualiser;         break;
      case 'selection-sort': Child = SelectionSortVisualiser; break;
      case 'insertion-sort': Child = InsertionSortVisualiser; break;
      case 'shell-sort':     Child = ShellSortVisualiser;     break;
      case 'merge-sort':     Child = MergeSortVisualiser;     break;
      case 'quick-sort':     Child = QuickSortVisualiser;     break;
      default:               Child = null;
    }
    return (
      <div>
        <h1>{this.props.route}</h1>
        <Child />
      </div>
    );
  },
});

const kumagorithm = {
  App,
  render(container, r) {
    ReactDOM.render(<App route={r} />, container);
    return;
  },
};

module.exports = kumagorithm;
