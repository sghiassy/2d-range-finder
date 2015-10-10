'use strict';

var React = require('react');

var Canvas = React.createClass({
  render() {
    return (
      <canvas id="mainCanvas" style={Style.canvas} width="1000px" height="500px" onClick={this.onPress}></canvas>
    );
  },

  componentDidMount() {
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }
});

var Style = {
  canvas: {
    backgroundColor: 'white',
  }
}

module.exports = Canvas;
