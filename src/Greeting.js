var React = require('react');

var Greeting = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },

  render: function() {
    return (
      <div className="greeting">
        <h1 style={Style.header}>Whoa</h1>
        Hello, {this.props.name}!
        <p>{this.state.secondsElapsed}</p>
      </div>
    );
  },

  /**
   * Timer methods
   */

  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
});

var Style = {
  header: {
    color: 'red'
  }
}

module.exports = Greeting;
