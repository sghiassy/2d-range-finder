var React = require('react');
var Title = require('./title');
var Canvas = require('./canvas/canvas');

var Greeting = React.createClass({
  render: function() {
    return (
      <div style={Style.wrapper}>
        <Title displayName={"2D Point Finder"} />
        <Canvas />
      </div>
    );
  }
});

var Style = {
  wrapper: {
    backgroundColor:'green',
    height: '100%',
    textAlign: 'center'
  }
}

module.exports = Greeting;
