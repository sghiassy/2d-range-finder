var React = require('react');

var Greeting = React.createClass({
  render: function() {
    return (
      <div style={Style.wrapper}>
        <h1 style={Style.header}>2D Point Finder</h1>
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
  header: {
    color: 'white',
    fontFamily: "sans-serif",
    fontSize: '30px',
    paddingTop: '10px',
    marginBottom: '10px',
  },
  canvas: {
    backgroundColor: 'white',
    width: '80%',
    height: '90%'
  }
}

module.exports = Greeting;
