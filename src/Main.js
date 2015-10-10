var React = require('react');
var Title = require('./title');
var Canvas = require('./canvas');

var Greeting = React.createClass({
  render: function() {
    return (
      <div style={Style.wrapper}>
        <Title displayName={"2D Point Finder"} />
        <canvas id="mainCanvas" style={Style.canvas} width="1000px" height="500px" onClick={this.onPress}></canvas>
      </div>
    );
  },

  onPress: function(evt) {
    Canvas();
  }
});

var Style = {
  wrapper: {
    backgroundColor:'green',
    height: '100%',
    textAlign: 'center'
  },
  canvas: {
    backgroundColor: 'white',
  }
}

module.exports = Greeting;
