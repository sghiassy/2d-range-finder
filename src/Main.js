var React = require('react');

var Greeting = React.createClass({

  render: function() {
    return (
      <div className="wrapper">
        <h1 style={Style.header}>2D Point Finder</h1>
        <div id="left">
          <canvas style={Style.canvas} width="300" height="200"></canvas>
        </div>
        <div id="right">

        </div>
      </div>
    );
  },
});

var Style = {
  header: {
    color: 'white',
    fontFamily: "sans-serif"
  },
  canvas: {
    backgroundColor: 'white',
    border: 'thin red solid'
  }
}

module.exports = Greeting;
