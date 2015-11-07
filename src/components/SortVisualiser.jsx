var React  = require('react');
var d3     = require('d3');

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

var SortVisualiser = {
  getInitialState: function() {
    return {
      array: [],
      value: {
        selections: [],
        numOfComp: 0,
        numOfExch: 0
      }
    };
  },
  getDefaultProps: function() {
    return {
      interval: 50,
      width: width,
      height: height,
      radius: radius,
      N: N,
      MAX: MAX,
      colors: colors
    };
  },
  initArray: function() {
    var N = this.props.N, MAX = this.props.MAX;
    this.state.array = [];
    for (var i = 0; i < N; i++) {
      this.state.array.push(~~(Math.random() * MAX));
    }
    this.generator = this.props.sort.sort(this.state.array, (v, w) => {
      return v < w;
    });
  },
  initD3: function() {
  },
  updateD3: function() {
    var width = this.props.width, height = this.props.height;
    var MAX = this.props.MAX;
    var colors = this.props.colors;
    var svgContainer = d3.select(React.findDOMNode(this.refs.svg));
    svgContainer.selectAll("*").remove();
    var data = [];
    var selections = this.state.value.selections || [];
    for (var i = 0, l = this.state.array.length; i < l; i++) {
      var h = this.state.array[i] * height;
      var color = colors.normal;
      if (selections[0] == i) color = colors.highlight1;
      if (selections[1] == i) color = colors.highlight2;
      if (selections[2] == i) color = colors.highlight3;
      if (selections[3] == i) color = colors.highlight4;
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
    if (selections.length >= 2) {
      var lo = selections[0];
      var hi = selections[1];
      svgContainer.append("rect")
                  .attr("x", lo * width)
                  .attr("y", 0)
                  .attr("width", (hi - lo + 1) * width)
                  .attr("height", height * MAX)
                  .style('fill', 'gray')
                  .style('fill-opacity', 0.25);
      svgContainer.append("rect")
                  .attr("x", selections[3] * width)
                  .attr("y", 0)
                  .attr("width", width)
                  .attr("height", height * MAX)
                  .style('fill', 'gray')
                  .style('fill-opacity',
                         this.state.value.partitionEnd ? 0.5 : 0);
    }
  },
  next: function() {
    var value = this.generator.next().value;
    if (value) this.state.value = value;
    this.forceUpdate();
  },
  auto: function() {
    setTimeout((() => {
      this.next();
      if (this.state.value) {
        this.auto()
      }
    }).bind(this), this.props.interval)
  },
  onClickResetButton: function() {
    this.state.value.selections = [];
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
  getController: function() {
    return (
      <div>
        <button type="button" onClick={this.onClickResetButton}>Reset</button>
        <button type="button" onClick={this.onClickNextButton}>Next</button>
        <button type="button" onClick={this.onClickAutoButton}>Auto</button>
        <div>size: {this.state.array.length}</div>
        <div>num of compare: {this.state.value.numOfComp}</div>
        <div>num of exchange: {this.state.value.numOfExch}</div>
      </div>
    );
  }
};

module.exports = SortVisualiser;
