var React          = require('react');
var MergeSort      = require('../MergeSort');
var SortVisualiser = require('./SortVisualiser');

var width  = 10;
var height = 5;
var radius = 15;
var N      = 30;
var MAX    = 50;
var colors = {
  normal: '#77F9C3',
  highlight1: 'blue',
  highlight2: 'red',
  highlight3: 'yellow',
  highlight4: 'green'
};

var MergeSortVisualiser = React.createClass({
  mixins: [SortVisualiser],
  getDefaultProps: function() {
    return {

      sort: MergeSort
    };
  },
  componentDidMount: function() {
  },
  componentDidUpdate: function() {
  },
  renderLine: function() {
    if (!this.state.value.selections) return;
    var s = this.state.value.selections;
    var lo = this.state.value.lo;
    var hi = this.state.value.hi;

    if (s.length == 0 || lo === undefined || hi === undefined) return;
    var data = [
      {d: 'M ' + (lo*10) + ' 0 v 250', stroke: 'black', strokeWidth: 1},
      {d: 'M ' + ((hi+1)*10) + ' 0 v 250', stroke: 'black', strokeWidth: 1}
    ];
    return data.map((d) => {
      return <path d={d.d} stroke={d.stroke} strokeWidth={d.strokeWidth}></path>
    });
  },
  renderAux: function() {
    if (!this.state.value.aux) return;
    var array = this.state.value.aux;
    var data = [];
    var selections = this.state.value.auxSelections || [];
    var lo = this.state.value.lo, hi = this.state.value.hi;

    for (var i = lo; i <= hi; i++) {
      if (array[i] === undefined) continue;
      var h = array[i] * height;
      var color = colors.normal;
      if (selections[0] == i) color = colors.highlight2;
      if (selections[1] == i) color = colors.highlight3;
      data.push({
        key: i,
        x: i * width,
        y: height * MAX - h,
        h: h,
        color: color
      });
    }
    return data.map((d) => {
      return <rect key={d.key}
                 x={d.x} y={d.y} width={width} height={d.h}
                 strokeWidth="1" stroke="#136FFF" fill={d.color}></rect>
    });
  },
  getExtra: function() {
    var s = this.state.value.selections || [];
    var as = this.state.value.auxSelections || [];
    var lo = this.state.value.lo, hi = this.state.value.hi;
    return (
      <div>
        <div>lo: {lo}, hi: {hi}, k: {s[0]}, i: {as[0]},  j: {as[1]} </div>
      </div>
    );
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
          {this.renderItems()}
          {this.renderLine()}
        </svg>
        <br/>
        <svg ref="svg_aux"
             width={this.state.array.length * width}
             height={height * MAX}>
          {this.renderAux()}
          {this.renderLine()}
        </svg>
      </div>
    );
  }
});

module.exports = MergeSortVisualiser;
