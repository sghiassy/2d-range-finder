var React = require('react');

var Greeting = React.createClass({
  getInitialState: function() {
    return {header: '2D Point Finder'};
  },

  render: function() {
    return (
      <div className="wrapper">
        <h1 onClick={this.onClick} style={Style.header}>{this.state.header}</h1>
        <div id="left">
          <canvas style={Style.canvas} width="300" height="200"></canvas>
        </div>
        <div id="right">
        </div>
      </div>
    );
  },

  onClick: function(evt) {
    this.setState({header:'Shaheen'});
  }
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
