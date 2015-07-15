var React  = require('react');
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
  highlight2: 'red',
  highlight3: 'yellow'
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
      interval: 50
    };
  },
  initArray: function() {
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
    var svgContainer = d3.select(".svg");
    svgContainer.selectAll("*").remove();
    var data = [];
    var selections = this.state.value.selections || [];
    for (var i = 0, l = this.state.array.length; i < l; i++) {
      var h = this.state.array[i] * height;
      var color = colors.normal;
      if (selections[0] == i) color = colors.highlight1;
      if (selections[1] == i) color = colors.highlight2;
      if (selections[2] == i) color = colors.highlight3;
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
    this.state.value = this.generator.next().value;
    if (!this.state.value) {
      this.state.value.selections = [];
    }
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
  render: function() {
    var extra = null
    if (this.getExtra) {
      extra = this.getExtra();
    }
    return (
      <div>
        <button type="button" onClick={this.onClickResetButton}>Reset</button>
        <button type="button" onClick={this.onClickNextButton}>Next</button>
        <button type="button" onClick={this.onClickAutoButton}>Auto</button>
        <div>size: {this.state.array.length}</div>
        <div>num of compare: {this.state.value.numOfComp}</div>
        <div>num of exchange: {this.state.value.numOfExch}</div>
        {extra}
        <br/>
        <svg className="svg"
             width={this.state.array.length * width}
             height={height * MAX}>
        </svg>
      </div>
    );
  }
};

module.exports = SortVisualiser;
