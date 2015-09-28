var React = require('react');// require the core node events module
var Greeting = require('./src/Greeting');
var styles = require('./src/styles.css');

React.render(
  <Greeting name="World"/>,
  document.body
);
