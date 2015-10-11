'use strict';

var React = require('react');

var Explaination = React.createClass({
  render: function() {
    return (
      <div style={Style.div}>
        <h2 style={Style.title}>Technologies Used</h2>
        <ul>
          <li>HTML5
            <ul>
              <li>HTML5 Canvas</li>
              <li>EcmaScript 6</li>
              <li>React JS</li>
              <li>JSX</li>
            </ul>
          </li>
          <li>Build System
            <ul>
              <li>Babel</li>
              <li>WebPack</li>
            </ul>
          </li>
          <li>
            Testing
            <ul>
              <li>Mocha</li>
              <li>ShouldJS</li>
            </ul>
          </li>
          <li>Algorithms
            <ul>
              <li>Finite State Machines</li>
              <li>2D Interval Tree</li>
              <li>Binary Search Tree</li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

var Style = {
  title: {
    fontSize: '25px',
    margin: '5px'
  },
  div: {
    textAlign: 'left'
  }
}

module.exports = Explaination;
