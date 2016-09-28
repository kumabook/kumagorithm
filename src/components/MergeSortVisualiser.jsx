const MergeSort      = require('../algorithm/MergeSort');
const SortVisualiser = require('./SortVisualiser');
const React          = require('react');
const ReactMotion    = require('react-motion');

const Motion         = ReactMotion.Motion;
const spring         = ReactMotion.spring;

const width  = 20;
const height = 5;
const MAX    = 50;
const colors = {
  normal: '#77F9C3',
  highlight1: '#0074d9',
  highlight2: '#ff4136',
  highlight3: '#f1c40f',
  highlight4: '#2ecc40',
};

const MergeSortVisualiser = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    MAX: React.PropTypes.number,
  },
  mixins: [SortVisualiser],
  getDefaultProps() {
    return { sort: MergeSort };
  },
  componentDidMount() {
  },
  componentDidUpdate() {
  },
  getExtra() {
    const s  = this.state.value.selections || [];
    const as = this.state.value.auxSelections || [];
    const lo = this.state.value.lo;
    const hi = this.state.value.hi;
    return (
      <div>
        <div>lo: {lo}, hi: {hi}, k: {s[0]}, i: {as[0]},  j: {as[1]} </div>
      </div>
    );
  },
  renderLine() {
    if (!this.state.value.selections) return null;
    const s = this.state.value.selections;
    const lo = this.state.value.lo;
    const hi = this.state.value.hi;

    if (s.length === 0 || lo === undefined || hi === undefined) return null;
    const data = [
      { key: 1, d: `M ${(lo * width)} 0 v 250`, stroke: 'black', strokeWidth: 1 },
      { key: 2, d: `M ${((hi + 1) * width)} 0 v 250`, stroke: 'black', strokeWidth: 1 },
    ];
    return data.map(d => (
      <path
        key={d.key}
        d={d.d} stroke={d.stroke} strokeWidth={d.strokeWidth}
      />
    ));
  },
  renderMain() {
    const w = this.props.width;
    const max = this.props.MAX;
    const data = [];
    const selections = this.state.value.selections || [];
    for (let i = 0, l = this.state.array.length; i < l; i += 1) {
      const h = this.state.array[i] * height;
      let color = colors.normal;
      if (selections[0] === i) color = colors.highlight1;
      if (selections[1] === i) color = colors.highlight2;
      if (selections[2] === i) color = colors.highlight3;
      if (selections[3] === i) color = colors.highlight4;
      data.push({
        key: i,
        x: i * w,
        y: (height * max) - h,
        h,
        color,
      });
    }
    return (
      <g>
        {data.map((d) => {
          const style = {
            x: spring(d.x),
            y: spring(d.y),
            width: w,
            h: d.h,
          };
          const color = d.color;
          return (
            <Motion
              key={d.key}
              style={style}
            >
              {s => (
                <rect
                  x={s.x} y={s.y} width={w} height={s.h}
                  stroke="#136FFF" strokeWidth="1" fill={color}
                />
               )
              }
            </Motion>
          );
        })
       }
      </g>
    );
  },
  renderAux() {
    if (!this.state.value.aux) return null;
    const array = this.state.value.aux;
    const data = [];
    const selections = this.state.value.auxSelections || [];
    const lo = this.state.value.lo;
    const hi = this.state.value.hi;

    for (let i = lo; i <= hi; i += 1) {
      if (array[i] !== undefined) {
        const h = array[i] * height;
        let color = colors.normal;
        if (selections[0] === i) color = colors.highlight2;
        if (selections[1] === i) color = colors.highlight3;
        data.push({
          key: array[i],
          x: i * width,
          y: (height * MAX) - h,
          h,
          color,
        });
      }
    }
    return (
      <g>
        {data.map((d) => {
          const style = {
            x: spring(d.x),
            y: spring(d.y),
            width,
            h: d.h,
          };
          const color = d.color;
          return (
            <Motion
              key={d.key}
              style={style}
            >
              {s => (
                <rect
                  key={s.key}
                  x={s.x} y={s.y} width={width} height={s.h}
                  strokeWidth="1" stroke="#136FFF" fill={color}
                />
              )}
            </Motion>
          );
        })}
      </g>
    );
  },
  render() {
    const w   = this.props.width;
    const h   = this.props.height;
    const max = this.props.MAX;
    let extra = null;
    if (this.getExtra) {
      extra = this.getExtra();
    }
    return (
      <div>
        {this.getController()}
        {extra}
        <br />
        <svg
          width={this.state.array.length * w}
          height={h * max}
        >
          {this.renderMain()}
          {this.renderLine()}
        </svg>
        <br />
        <svg
          width={this.state.array.length * w}
          height={h * max}
        >
          {this.renderAux()}
          {this.renderLine()}
        </svg>
      </div>
    );
  },
});

module.exports = MergeSortVisualiser;
