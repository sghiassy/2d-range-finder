'use strict';

var React = require('react');
var App = require('./app');

var Canvas = React.createClass({
  componentDidMount() {
    var canvas = this.getDOMNode();
    var ctx = canvas.getContext("2d");
    this.app = new App({ctx:ctx, el:canvas});
  },

  render() {
    return (
      <canvas style={Style.canvas} width="1000px" height="500px" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.onMouseMove}></canvas>
    );
  },

  mouseDown(evt) {
    this.app.onMouseDown(evt);
  },

  onMouseMove(evt) {
    this.app.onMouseMove(evt);
  },

  mouseUp(evt) {
    this.app.onMouseUp(evt);
  }
});

var Style = {
  canvas: {
    backgroundColor: 'white',
  }
}

module.exports = Canvas;
