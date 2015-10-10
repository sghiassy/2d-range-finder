var React = require('react');
var Title = require('./title');

var Greeting = React.createClass({
  render: function() {
    return (
      <div style={Style.wrapper}>
        <Title displayName={"2D Point Finder"} />
        <canvas style={Style.canvas} ></canvas>
      </div>
    );
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
    width: '80%',
    height: '90%'
  }
}

module.exports = Greeting;
