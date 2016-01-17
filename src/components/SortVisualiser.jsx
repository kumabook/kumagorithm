var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactMotion = require('react-motion');
var Motion      = ReactMotion.Motion;
var spring      = ReactMotion.spring;
var presets     = ReactMotion.presets;
var width  = 20;
var height = 5;
var radius = 15;
var N      = 30;
var MAX    = 50;
var colors = {
  normal: '#87CEEB',     // SkyBlue
  highlight1: '#7B68EE', // MediumSlateBlue
  highlight2: '#F4A460', // SandyBrown
  highlight3: '#FFF8DC', // Cornsilk
  highlight4: '#90EE90'  // LightGreen
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
    while (this.state.array.length < N) {
      let val = ~~(Math.random() * MAX);
      if (!this.state.array.includes(val)) this.state.array.push(val);
    }
    this.generator = this.props.sort.sort(this.state.array, (v, w) => {
      return v < w;
    });
  },
  renderItems: function() {
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
        key: this.state.array[i],
        x: i * width,
        y: height * MAX - h,
        h: h,
        color: color
      });
    }
    if (selections.length >= 2) {
      var lo = Math.min(selections[0], selections[1]);
      var hi = Math.max(selections[0], selections[1]);
      extraRects.push(
        <rect key="selection-1"
              x={lo * width} y="0"
              width={(hi - lo + 1) * width} height={height * MAX}
              fill="gray" fillOpacity="0.25">
        </rect>);
    }
    if (selections.length >= 4) {
      extraRects.push(<rect key="selection-2"
                       x={selections[3] * width} y="0"
                       width={width} height={height * MAX}
                       fill="gray" fillOpacity={this.state.value.partitionEnd ? 0.5 : 0}>
      </rect>);
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
        {extraRects}
      </g>
    );
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
  },
  componentDidUpdate: function() {
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
