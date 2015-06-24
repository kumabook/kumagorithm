var React  = require('react');
var Sort   = require('../SelectionSort');
var d3     = require('d3');
var count  = 1;
var width  = 10;
var height = 5;
var radius = 15;
var N      = 30;
var MAX    = 50;
var colors = {
  normal: '#77F9C3',
  highlight1: 'blue',
  highlight2: 'red'
};
var interval = 100;
var SelectionSortVisualiser = React.createClass({
  getInitialState: function() {
    return {
      array: [],
      selections: []
    };
  },
  initArray: function() {
    this.state.array = [];
    for (var i = 0; i < N; i++) {
      this.state.array.push(~~(Math.random() * MAX))
    }
    this.generator = Sort.sort(this.state.array, (v, w) => {
      return v < w;
    });
  },
  initD3: function() {
  },
  updateD3: function() {
    var svgContainer = d3.select(".svg");
    svgContainer.selectAll("*").remove();
    var data = [];
    var selections = this.state.selections || [];
    for (var i = 0, l = this.state.array.length; i < l; i++) {
      var h = this.state.array[i] * height;
      var color = colors.normal;
      if (selections[0] == i) color = colors.highlight1;
      if (selections[1] == i) color = colors.highlight2;
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
  next: function() {
    this.state.selections = this.generator.next().value;
    this.forceUpdate();
  },
  auto: function() {
    setTimeout((() => {
      this.next();
      if (!Sort.isSorted(this.state.array,  (v, w) => { return v < w; })) {
        this.auto()
      }
    }).bind(this), interval)
  },
  onClickResetButton: function() {
    this.initArray();
    this.forceUpdate();
  },
  onClickNextButton: function() {
    this.next();
  },
  onClickAutoButton: function() {
    this.auto();
  },
  componentWillMount: function() {
    this.initArray();
  },
  componentDidMount: function() {
    this.updateD3();
  },
  componentDidUpdate: function() {
    this.updateD3();
  },
  componentWillUnmount: function() {
  },
  render: function() {
    return (
      <div>
        <button id="reset-button"   type="button" onClick={this.onClickResetButton}>Reset</button>
        <button id="next-button"    type="button" onClick={this.onClickNextButton}>Next</button>
        <button id="auto-button"    type="button" onClick={this.onClickAutoButton}>Auto</button>
        <div>size: {this.state.array.length}</div>
        <br/>
        <svg className="svg"
             width={this.state.array.length * width}
             height={height * MAX}>
        </svg>
      </div>
    );
  }
});

module.exports = SelectionSortVisualiser;
