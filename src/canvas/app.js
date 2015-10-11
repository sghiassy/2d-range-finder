'use strict'

var ClickStateMachine = require('./clickStateMachine');

class App {
  constructor(props) {
    this.el = props.el;
    this.ctx = props.ctx;
    // this.ctx.beginPath();
    // this.ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // this.ctx.stroke();

    this.clickState = new ClickStateMachine();
  }

  onClick(evt) {
    this.clickState.sendMessage('userClicked');

    if (this.clickState.currentState === ClickStateMachine.STATES.DONE) {
      var orig = {
        x: this.temp.x - this.el.getBoundingClientRect().left,
        y: this.temp.y - this.el.getBoundingClientRect().top
      };

      var end = {
        x: evt.pageX - this.el.getBoundingClientRect().left,
        y: orig.y
      };

      this.ctx.beginPath();
      this.ctx.moveTo(orig.x, orig.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.stroke();

      this.temp = undefined;
    } else {
      this.temp = {x:evt.pageX,y:evt.pageY};
    }
    // this.ctx.beginPath();
    // this.ctx.arc(evt.pageX - this.el.getBoundingClientRect().left,
    //              evt.pageY - this.el.getBoundingClientRect().top,
    //              40, 0, 2 * Math.PI);
    // this.ctx.stroke();
  }
}

module.exports = App;
