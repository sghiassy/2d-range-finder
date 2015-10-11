'use strict'

var ClickStateMachine = require('./clickStateMachine');

class App {
  constructor(props) {
    this.el = props.el;

    // Setup Draw Context
    this.ctx = props.ctx;
    this.ctx.font = "10px Arial";

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

      this.drawLine({
        start: {x: orig.x, y:orig.y},
        end: {x: end.x, y:end.y}
      });

      this.drawLineLabel({
        start: {x: orig.x, y:orig.y},
        end: {x: end.x, y:end.y}
      });

      this.temp = undefined;
    } else {
      this.temp = {x:evt.pageX,y:evt.pageY};
    }
  }

  drawLine(coord) {
    this.ctx.beginPath();
    this.ctx.moveTo(coord.start.x, coord.start.y);
    this.ctx.lineTo(coord.end.x, coord.end.y);
    this.ctx.stroke();
  }

  drawLineLabel(coord) {
    var startingPointTxt = "{x:" + coord.start.x + ", y:" + coord.start.y + "}";
    var endingPointTxt = "{x:" + coord.end.x + ", y:" + coord.end.y + "}";

    var labelWidth = this.ctx.measureText(startingPointTxt).width + this.ctx.measureText(endingPointTxt).width;
    var lineLength = coord.end.x - coord.start.x;
    var lineIsTooShort = labelWidth >= lineLength;

    if (!lineIsTooShort) {
      this.ctx.fillText(startingPointTxt, coord.start.x, coord.start.y-5);
      this.ctx.fillText(endingPointTxt, coord.end.x - this.ctx.measureText(endingPointTxt).width, coord.end.y-5);
    } else {
      var shortenedLabel = "{x:" + coord.start.x + ", y:" + coord.start.y + " x:" + coord.end.x + "}";
      this.ctx.fillText(shortenedLabel, coord.start.x, coord.start.y-5);
    }
  }
}

module.exports = App;
