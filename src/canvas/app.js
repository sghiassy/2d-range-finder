'use strict'

class App {
  constructor(props) {
    this.ctx = props.ctx;
    this.ctx.beginPath();
    this.ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  onClick(evt) {
    this.ctx.beginPath();
    this.ctx.arc(evt.pageX, evt.pageY, 40, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

module.exports = App;
