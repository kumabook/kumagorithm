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
    this.updateD3();
    this.updateD3Aux();
    this.updateD3Line();
  },
  componentDidUpdate: function() {
    this.updateD3();
    this.updateD3Aux();
    this.updateD3Line();
  },
  updateD3Line: function() {
    if (!this.state.value.selections) return;
    var s = this.state.value.selections;
    var lo = this.state.value.lo;
    var hi = this.state.value.hi;

    if (s.length == 0 || lo === undefined || hi === undefined) return;
    var svgContainer = d3.selectAll('svg');
    var data = [
      {d: 'M ' + (lo*10) + ' 0 v 250', stroke: 'black', strokeWidth: 1},
      {d: 'M ' + ((hi+1)*10) + ' 0 v 250', stroke: 'black', strokeWidth: 1}
    ];
    svgContainer.selectAll("path")
                .data(data)
                .enter()
                .append("path")
                .attr("d", d => { return d.d; })
                .attr("stroke", d => { return d.stroke; })
                .attr("stroke-width", d => { return d.strokeWidth; });
  },
  updateD3Aux: function() {
    if (!this.state.value.aux) return;
    var svgContainer = d3.select(React.findDOMNode(this.refs.svg_aux));
    var array = this.state.value.aux;
    var data = [];
    var selections = this.state.value.auxSelections || [];
    var lo = this.state.value.lo, hi = this.state.value.hi;

    svgContainer.selectAll("*").remove();

    for (var i = lo; i <= hi; i++) {
      if (array[i] === undefined) continue;
      var h = array[i] * height;
      var color = colors.normal;
      if (selections[0] == i) color = colors.highlight2;
      if (selections[1] == i) color = colors.highlight3;
      data.push({
        x: i * width,
        y: height * MAX - h,
        h: h,
        color: color
      });
    }
    var rects   = svgContainer.selectAll("rect")
                              .data(data)
                              .enter()
                              .append("rect");
    var rectAttributes = rects.attr("x", d => { return d.x; })
                              .attr("y", d => { return d.y; })
                              .attr("width", width)
                              .attr("height", d => { return d.h; })
                              .attr('stroke-width', 1)
                              .attr('stroke', '#136FFF')
                              .style('fill', d => { return d.color} );
  },
  getExtra: function() {
    var s = this.state.value.selections;
    var lo = this.state.value.lo, hi = this.state.value.hi;
    return (
      <div>
        <div>lo: {lo}, hi: {hi}, i: {s[0]},  j: {s[1]} </div>
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
        </svg>
        <br/>
        <svg ref="svg_aux"
             width={this.state.array.length * width}
             height={height * MAX}>
        </svg>
      </div>
    );
  }
});

module.exports = MergeSortVisualiser;
