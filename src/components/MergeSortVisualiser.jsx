var MergeSort      = require('../MergeSort');
var SortVisualiser = require('./SortVisualiser');
var React          = require('react');
var ReactDOM       = require('react-dom');
var ReactMotion    = require('react-motion');
var Motion         = ReactMotion.Motion;
var spring         = ReactMotion.spring;
var presets        = ReactMotion.presets;

var width  = 20;
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
      {key: 1, d: 'M ' + (lo * width) + ' 0 v 250', stroke: 'black', strokeWidth: 1},
      {key: 2, d: 'M ' + ((hi+1) * width) + ' 0 v 250', stroke: 'black', strokeWidth: 1}
    ];
    return data.map((d) => {
      return <path key={d.key}
                   d={d.d} stroke={d.stroke} strokeWidth={d.strokeWidth}></path>
    });
  },
  renderMain: function() {
    var width = this.props.width, height = this.props.height;
    var MAX = this.props.MAX;
    var colors = this.props.colors;
    var data = [];
    var selections = this.state.value.selections || [];
    var extraRects = [];
    for (var i = 0, l = this.state.array.length; i < l; i++) {
      var h = this.state.array[i] * height;
      var color = colors.normal;
      if (selections[0] == i) color = colors.highlight1;
      if (selections[1] == i) color = colors.highlight2;
      if (selections[2] == i) color = colors.highlight3;
      if (selections[3] == i) color = colors.highlight4;
      data.push({
        key: i,
        x: i * width,
        y: height * MAX - h,
        h: h,
        color: color
      });
    }
    return (
      <g>
        {data.map((d) => {
           let style = {
             x: spring(d.x),
             y: spring(d.y),
             width: width,
             h: d.h,
             color: d.color
           };
           return (
             <Motion key={d.key}
                     style={style}>
               {d => {
                  return (<rect
                              x={d.x} y={d.y} width={width} height={d.h}
                              stroke="#136FFF" strokeWidth="1" fill={d.color}>
                  </rect>);
                }
               }
             </Motion>
           );
         })
        }
      </g>
    );
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
        key: array[i],
        x: i * width,
        y: height * MAX - h,
        h: h,
        color: color
      });
    }
    return (
      <g>
        {data.map((d) => {
           let style = {
             x: spring(d.x),
             y: spring(d.y),
             width: width,
             h: d.h,
             color: d.color
           };
           return (
             <Motion key={d.key}
                     style={style}>
               {d => {
                  return (
                    <rect key={d.key}
                          x={d.x} y={d.y} width={width} height={d.h}
                          strokeWidth="1"
                          stroke="#136FFF"
                          fill={d.color}></rect>
                  );
                }
               }
             </Motion>
           );
         })
        }
      </g>
    );
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
          {this.renderMain()}
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
