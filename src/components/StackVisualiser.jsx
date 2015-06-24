var React  = require('react');
var Stack = require('../stack');
var d3     = require('d3');
var count  = 1;
var width  = 50;
var height = 35;
var radius = 15;
var N      = 8;
var StackVisualiser = React.createClass({
  getInitialState: function() {
    return {stack: new Stack()};
  },
  initD3: function() {
  },
  updateD3: function() {
    var circlesData = [];
    var rectsData = [];
    var vec = this.state.stack;
    for (var i = 0, l = vec.getCapacity(); i < l; i++) {
      rectsData.push({
        x: ((i % N)) * width,
        y: ~~(i / N) * height,
        width:  width,
        height: height
      });
    }
    for (var i = 0, l = vec.getSize(); i < l; i++) {
      circlesData.push({
        x: (i % N) * width + 0.5 * width,
        y:  ~~(i / N) * height + 0.5 * height,
        radius: radius,
        text: vec.get(i)
      });
    }

    var svgContainer = d3.select(".svg");
    svgContainer.selectAll("*").remove();
    var rects   = svgContainer.selectAll("rect")
                              .data(rectsData)
                              .enter()
                              .append("rect");
    var rectAttributes = rects.attr("x", d => { return d.x; })
                              .attr("y", d => { return d.y; })
                              .attr("width", d => { return d.width; })
                              .attr("height", d => { return d.height; })
                              .attr('stroke-width', 1)
                              .attr('stroke', '#136FFF')
                              .style('fill',  '#77F9C3');
    var circles = svgContainer.selectAll("circle")
                              .data(circlesData)
                              .enter()
                              .append("circle");

    var circleAttributes = circles.attr("cx", d => { return d.x; })
                                  .attr("cy", d => { return d.y; })
                                  .attr("r",  d => { return d.radius; })
                                  .style("fill", '#D6FF58');

    var texts = svgContainer.selectAll("text")
                              .data(circlesData)
                              .enter()
                              .append("text");
    var textAttributes = texts.attr("x", d => { return d.x; })
                              .attr("y", d => { return d.y; })
                              .attr('text-anchor', 'middle')
                              .attr('dominant-baseline', 'middle')
                              .text(d => { return d.text; })
                              .style("fill", '#000000');

  },
  componentDidMount: function() {
    this.updateD3();
  },
  componentDidUpdate: function() {
    this.updateD3();
  },
  componentWillUnmount: function() {
  },
  onClickPushButton: function() {
    this.state.stack.push(count++);
    this.forceUpdate();
    console.log(this.state.stack);
  },
  onClickPopButton: function() {
    var val = this.state.stack.pop();
    this.forceUpdate();
    console.log(val);
  },
  onClickClearButton: function() {
    this.setState({ stack: new Stack() });
  },
  render: function() {
    return (
      <div>
        <button id="push-button"   type="button" onClick={this.onClickPushButton}>Push</button>
        <button id="pop-button"    type="button" onClick={this.onClickPopButton}>Pop</button>
        <button id="clear-button"  type="button" onClick={this.onClickClearButton}>cleard</button>
        <div>size: {this.state.stack.getSize()}, capacity: {this.state.stack.getCapacity()}</div>
        <br/>
        <svg className="svg"
             width={N * width}
             height={(~~(this.state.stack.getCapacity() / N) + 1) * height}>
        </svg>
      </div>
    );
  }
});

module.exports = StackVisualiser;
