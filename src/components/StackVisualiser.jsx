const React    = require('react');
const Stack    = require('../collections/TypedArrayStack');

const w        = 50;
const h        = 35;
const radius   = 15;
const N        = 8;
let count      = 1;
const StackVisualiser = React.createClass({
  getInitialState() {
    return { stack: new Stack() };
  },
  onClickPushButton() {
    this.state.stack.push(count);
    count += 1;
    this.forceUpdate();
  },
  onClickPopButton() {
    this.state.stack.pop();
    this.forceUpdate();
  },
  onClickClearButton() {
    this.setState({ stack: new Stack() });
  },
  render() {
    const vec = this.state.stack;
    const offset = 1;
    const rects = Array(vec.getCapacity()).fill().map((_, i) => (
      {
        key: i,
        x: offset + ((i % N) * w),
        y: offset + (Math.floor(i / N) * h),
        width: w,
        height: h,
      }
    )).map(r => (
      <rect
        x={r.x} y={r.y} width={r.width} height={r.height}
        stroke="#136FFF" strokeWidth="1"
        fill="#77F9C3"
        key={r.key}
      />
    ));
    const circles = Array(vec.getSize()).fill().map((_, i) => (
      {
        key: i,
        x: offset + ((i % N) * w) + (0.5 * w),
        y: offset + (Math.floor((i / N) * h) + (0.5 * h)),
        radius,
        text: vec.get(i),
      }
    )).map(c => (
      <g key={c.key}>
        <circle cx={c.x} cy={c.y} r={c.radius} fill="#D6FF58" />
        <text
          x={c.x} y={c.y} fill="#000000"
          textAnchor="middle" dominantBaseline="middle"
        >
          {c.text}
        </text>
      </g>
    ));
    const num = Math.floor(this.state.stack.getCapacity() / N);
    return (
      <div>
        <button id="push-button" type="button" onClick={this.onClickPushButton}>Push</button>
        <button id="pop-button" type="button" onClick={this.onClickPopButton}>Pop</button>
        <button id="clear-button" type="button" onClick={this.onClickClearButton}>cleard</button>
        <div>size: {this.state.stack.getSize()}, capacity: {this.state.stack.getCapacity()}</div>
        <br />
        <svg
          className="svg"
          width={(N * w) + 2}
          height={((num + 1) * h) + 2}
        >
          {rects}
          {circles}
        </svg>
      </div>
    );
  },
});

module.exports = StackVisualiser;
