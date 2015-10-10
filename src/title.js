'use strict';

var React = require('react');

var Title = React.createClass({
  render() {
    return (
      <h1 style={Style.header}>{this.props.displayName}</h1>
    );
  }
});

var Style = {
  header: {
    color: 'white',
    fontFamily: "sans-serif",
    fontSize: '30px',
    paddingTop: '10px',
    marginBottom: '10px',
  },
}

module.exports = Title;
