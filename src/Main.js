var React = require('react');
var Title = require('./title');
var Canvas = require('./CanvasElement');
var Explaination = require('./explaination');

var Main = React.createClass({
  render: function() {
    return (
      <div style={Style.wrapper}>
        <div style={Style.innerWrapper}>
          <Title displayName={"2D Point Finder"} />
          <Canvas />
          <Explaination />
        </div>

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
  innerWrapper: {
    width: '1100px',
    // border: 'thin red solid',
    margin: 'auto'
  }
}

module.exports = Main;
