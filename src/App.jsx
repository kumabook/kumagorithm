const React                   = require('react');
const ReactDOM                = require('react-dom');
const StackVisualiser         = require('./components/StackVisualiser');
const SelectionSortVisualiser = require('./components/SelectionSortVisualiser');
const InsertionSortVisualiser = require('./components/InsertionSortVisualiser');
const ShellSortVisualiser     = require('./components/ShellSortVisualiser');
const MergeSortVisualiser     = require('./components/MergeSortVisualiser');
const QuickSortVisualiser     = require('./components/QuickSortVisualiser');

const visualizers = [
  { name: 'stack'         , component: StackVisualiser },
  { name: 'selection-sort', component: SelectionSortVisualiser },
  { name: 'insertion-sort', component: InsertionSortVisualiser },
  { name: 'shell-sort'    , component: ShellSortVisualiser },
  { name: 'merge-sort'    , component: MergeSortVisualiser },
  { name: 'quick-sort'    , component: QuickSortVisualiser }
];


const App = React.createClass({
  propTypes: {
    route: React.PropTypes.string,
  },
  render() {
    const visuals = visualizers.filter((v) => this.props.route === v.name)
                               .map((v) => <v.component key={v.name} />);
    return (
      <div>
        <h1>{this.props.route}</h1>
        {visuals}
      </div>
    );
  }
});

const kumagorithm = {
  App,
  render(container, r) {
    ReactDOM.render(<App route={r} />, container);
    return;
  },
  renderIndex(container, r) {
    const items = visualizers.map((v) => (
      <a className="navbar-item" key={v.name} href={`#${v.name}`}>{v.name}</a>)
    );
    ReactDOM.render(
      <div>
        <div className="navbar">
          {items}
        </div>
        <div className="visualiser-container">
          <App route={r} />
        </div>
      </div>
    , container);
    return;
  }
};

module.exports = kumagorithm;
