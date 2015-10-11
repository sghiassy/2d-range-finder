'use strict'

var ClickStateMachine = require('./clickStateMachine');
var IntervalTree = require('../IntervalSearchTree');

class App {
  constructor(props) {
    this.el = props.el;

    // Setup Draw Context
    this.ctx = props.ctx;
    this.ctx.font = "10px Arial";

    this.clickState = new ClickStateMachine();
    this.intervalTree = new IntervalTree();
  }

  onClick(evt) {
    this.clickState.sendMessage('userClicked');

    if (this.clickState.currentState === ClickStateMachine.STATES.DONE) {
      var coord;
      var orig = {
        x: this.temp.x - this.el.getBoundingClientRect().left,
        y: this.temp.y - this.el.getBoundingClientRect().top
      };

      var end = {
        x: evt.pageX - this.el.getBoundingClientRect().left,
        y: orig.y
      };

      var userClickedRightToLeft = orig.x < end.x;
      if (userClickedRightToLeft) {
        coord = {
          start: {x: orig.x, y:orig.y},
          end: {x: end.x, y:end.y}
        };
      } else {
        coord = {
          start: {x: end.x, y:end.y},
          end: {x: orig.x, y:orig.y}
        }
      }

      var userClickedTheSameSpot = coord.start.x === coord.end.x;

      if (!userClickedTheSameSpot) {
        this.intervalTree.addInterval({
          leftIndex: coord.start.x,
          rightIndex: coord.end.x
        });
        this.drawLine(coord);
        this.drawLineLabel(coord);
      }

      this.temp = undefined;
    } else {
      this.temp = {x:evt.pageX,y:evt.pageY};
    }
  }

  onMouseDown(evt) {
    console.log('onMouseDown');
    this.clickState.sendMessage('mouseDown');
    let coord = this.coordFromEvt(evt);
    this.drawPoint(coord);
  }

  onMouseMove(evt) {
    console.log('onMouseMove');
    this.clickState.sendMessage('mouseMove');
    let coord = this.coordFromEvt(evt);

    if (this.clickState.currentState === this.clickState.States.FIRSTPOINT) {
      this.clearCanvas();
      this.drawPoint(coord);
    }
  }

  onMouseUp(evt) {
    console.log('onMouseUp');
    this.clickState.sendMessage('mouseUp');
  }

  drawPoint(coord) {
    this.drawLine({
      start: coord,
      end: coord
    });
    this.drawLabel(coord);
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

  drawLabel(coord) {
    var label = "{x:" + coord.x + ", y:" + coord.y + "}";
    this.ctx.fillText(label, coord.x, coord.y - 5);
  }

  coordFromEvt(evt) {
    return {
      x: evt.pageX - this.el.getBoundingClientRect().left,
      y: evt.pageY - this.el.getBoundingClientRect().top
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
  }
}

module.exports = App;
