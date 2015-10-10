'use strict';

var React = require('react');
var App = require('./app');

var Canvas = React.createClass({
  render() {
    return (
      <canvas style={Style.canvas} width="1000px" height="500px" onClick={this.onPress}></canvas>
    );
  },

  componentDidMount() {
    var canvas = this.getDOMNode();
    var ctx = canvas.getContext("2d");
    this.app = new App({ctx:ctx});
  },

  onPress(evt) {
    this.app.onClick(evt)
  }
});

var Style = {
  canvas: {
    backgroundColor: 'white',
  }
}

module.exports = Canvas;
