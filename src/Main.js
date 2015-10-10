var React = require('react');

var Greeting = React.createClass({
  getInitialState: function() {
    return {header: '2D Point Finder'};
  },

  render: function() {
    var height = window.innerHeight;
    var width = window.innerWidth;

    return (
      <div style={Style.wrapper}>
        <h1 onClick={this.onClick} style={Style.header}>{this.state.header}</h1>
        <canvas style={Style.canvas} ></canvas>
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
  wrapper: {
    backgroundColor:'green',
    height: '100%',
    textAlign: 'center'
  },
  header: {
    color: 'white',
    fontFamily: "sans-serif",
    fontSize: '30px',
    textAlign: 'center',
    paddingTop: '10px',
    marginBottom: '10px',
  },
  canvas: {
    backgroundColor: 'white',
    width: '80%',
    height: '80%'
  }
}

module.exports = Greeting;
