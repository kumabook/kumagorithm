var React  = require('react');
var Stack = require('../Stack');
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
  componentDidMount: function() {
  },
  componentDidUpdate: function() {
  },
  componentWillUnmount: function() {
  },
  onClickPushButton: function() {
    this.state.stack.push(count++);
    this.forceUpdate();
  },
  onClickPopButton: function() {
    var val = this.state.stack.pop();
    this.forceUpdate();
  },
  onClickClearButton: function() {
    this.setState({ stack: new Stack() });
  },
  render: function() {
    var vec = this.state.stack;
    var offset = 1;
    var rects = Array(vec.getCapacity()).fill().map((_, i) => {
      return {
        x: offset + ((i % N)) * width,
        y: offset + ~~(i / N) * height,
        width:  width,
        height: height
      };
    }.map((r) => {
      return <rect x={r.x} y={r.y} width={r.width} height={r.height}
                   stroke="#136FFF" strokeWidth="1"
                   fill="#77F9C3" />
    });
    var circles = Array(vec.getSize()).fill().map((_, i) => {
      return {
        x: offset + (i % N) * width + 0.5 * width,
        y: offset + ~~(i / N) * height + 0.5 * height,
        radius: radius,
        text: vec.get(i)
      }
    })).map((c) => {
      return <g>
        <circle cx={c.x} cy={c.y} r={c.radius} fill="#D6FF58" />
        <text x={c.x} y={c.y} fill="#000000"
              textAnchor="middle" dominantBaseline="middle">{c.text}</text>
      </g>
    });
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
          {rects}
          {circles}
        </svg>
      </div>
    );
  }
});

module.exports = StackVisualiser;
