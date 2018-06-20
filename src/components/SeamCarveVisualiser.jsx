const React      = require('react');
const ReactDOM   = require('react-dom');
const SeamCarver = require('../algorithm/SeamCarver');

const SeamCarveVisualiser = React.createClass({
  getInitialState() {
    return {
      image:       null,
      imageData:   [],
      imageWidth:  100,
      imageHeight: 100,
      seamCarver:  null,
    };
  },
  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    const img  = new Image();
    img.src    = '/images/HJocean.png';
    const ctx  = canvas.getContext('2d');
    img.onload = (e) => this.onImageLoad(e.target);
    canvas.addEventListener('mousedown', this.onMouseDown);
  },
  componentDidUpdate() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    const ctx    = canvas.getContext('2d');
    const imageData = this.state.seamCarver.imageData;
    ctx.putImageData(imageData, 0, 0);
  },
  onImageLoad(img) {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    const ctx    = canvas.getContext('2d');
    console.log(`${img.width}, ${img.height}`)
    canvas.width    = img.width;
    canvas.height   = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    this.setState({
      image:       img,
      imageData:   imageData,
      imageHeight: img.height,
      imageWidth:  img.width,
      seamCarver:  new SeamCarver(imageData),
    });
  },
  onMouseDown(e) {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    canvas.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  onMouseUp(e) {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    canvas.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },
  onMouseMove(e) {
    e.preventDefault();
    const x = e.layerX;
    const y = e.layerY;
    const dx = Math.abs(this.state.mouseX - x);
    const dy = Math.abs(this.state.mouseY - y);
    if (dx < dy) {
      const horizontalSeam = this.state.seamCarver.findHorizontalSeam();
      this.state.seamCarver.removeHorizontalSeam(horizontalSeam);
    } else {
      const verticalSeam = this.state.seamCarver.findVerticalSeam();
      this.state.seamCarver.removeVerticalSeam(verticalSeam);
    }
    this.setState({
      mouseX: x,
      mouseY: y,
      imageWidth: this.state.seamCarver.width(),
      imageHeight: this.state.seamCarver.height(),
    });
  },
  render() {
    return (
      <canvas
        ref="canvas"
        width={this.state.imageWidth}
        height={this.state.imageHeight}
      />
    );
  }
});

module.exports = SeamCarveVisualiser;
