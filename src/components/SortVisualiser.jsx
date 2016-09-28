const React       = require('react');
const ReactMotion = require('react-motion');

const Motion      = ReactMotion.Motion;
const spring      = ReactMotion.spring;

const WIDTH  = 20;
const HEIGHT = 5;
const RADIUS = 15;
const N      = 30;
const MAX    = 50;

const SortVisualiser = {
  getInitialState() {
    return {
      array: [],
      value: {
        selections: [],
        numOfComp: 0,
        numOfExch: 0,
      },
    };
  },
  getDefaultProps() {
    return {
      interval: 50,
      width: WIDTH,
      height: HEIGHT,
      radius: RADIUS,
      N,
      MAX,
      colors: {
        normal: '#87ceeb',     // SkyBlue
        highlight1: '#7B68EE', // MediumSlateBlue
        highlight2: '#F4A460', // SandyBrown
        highlight3: '#FFF8DC', // Cornsilk
        highlight4: '#90EE90', // LightGreen
      },
    };
  },
  initArray() {
    const n = this.props.N;
    const max = this.props.MAX;
    this.state.array = [];
    while (this.state.array.length < n) {
      const val = Math.floor((Math.random() * max));
      if (!this.state.array.includes(val)) this.state.array.push(val);
    }
    this.generator = this.props.sort.sort(this.state.array, (v, w) => v < w);
  },
  renderItems() {
    const width      = this.props.width;
    const height     = this.props.height;
    const max        = this.props.MAX;
    const colors     = this.props.colors;
    const data       = [];
    const selections = this.state.value.selections || [];
    const extraRects = [];
    for (let i = 0, l = this.state.array.length; i < l; i += 1) {
      const h = this.state.array[i] * height;
      let color = colors.normal;
      if (selections[0] === i) color = colors.highlight1;
      if (selections[1] === i) color = colors.highlight2;
      if (selections[2] === i) color = colors.highlight3;
      if (selections[3] === i) color = colors.highlight4;
      data.push({
        key: this.state.array[i],
        x: i * width,
        y: (height * max) - h,
        h,
        color,
      });
    }
    if (selections.length >= 2) {
      const lo = Math.min(selections[0], selections[1]);
      const hi = Math.max(selections[0], selections[1]);
      extraRects.push(
        <rect
          key="selection-1"
          x={lo * width} y="0"
          width={width * ((hi - lo) + 1)}
          height={height * max}
          fill="gray" fillOpacity="0.25"
        />);
    }
    if (selections.length >= 4) {
      extraRects.push(
        <rect
          key="selection-2" x={selections[3] * width} y="0"
          width={width} height={height * max}
          fill="gray" fillOpacity={this.state.value.partitionEnd ? 0.5 : 0}
        />
      );
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
          return (
            <Motion key={d.key} style={style}>
              {s => (
                <rect
                  x={s.x} y={s.y} width={width} height={s.h}
                  stroke="#136FFF" strokeWidth="1" fill={d.color}
                />
              )}
            </Motion>
          );
        })}
        {extraRects}
      </g>
    );
  },
  next() {
    const value = this.generator.next().value;
    if (value) this.state.value = value;
    this.forceUpdate();
  },
  auto() {
    setTimeout((() => {
      this.next();
      if (this.state.value) {
        this.auto();
      }
    }), this.props.interval);
  },
  onClickResetButton() {
    this.state.value.selections = [];
    this.initArray();
    this.forceUpdate();
  },
  onClickNextButton() {
    this.next();
  },
  onClickAutoButton() {
    this.auto();
  },
  componentWillMount() {
    this.initArray();
  },
  getController() {
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
  },
};

module.exports = SortVisualiser;
