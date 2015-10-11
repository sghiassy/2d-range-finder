'use strict'

var ClickStateMachine = require('./ClickFSM');
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

  onMouseDown(evt) {
    this.clickState.sendMessage('mouseDown');
    let coord = this.coordFromEvt(evt);

    if (this.clickState.currentState === this.clickState.States.MOVING_FIRST_POINT) {
      this.firstPoint = coord;
      this.drawPoint(coord);
    }

  }

  onMouseMove(evt) {
    this.clickState.sendMessage('mouseMove');
    let coord = this.coordFromEvt(evt);

    if (this.clickState.currentState === this.clickState.States.MOVING_FIRST_POINT) {
      this.firstPoint = coord;
      this.clearCanvas();
      this.drawPoint(coord);
    } else if (this.clickState.currentState === this.clickState.States.MOVING_SECOND_POINT) {
      if (evt.shiftKey) {
        this.secondPoint = {
          x: coord.x,
          y: this.firstPoint.y
        };
      } else {
        this.secondPoint = coord;
      }

      this.clearCanvas();

      let line = {
        start: this.firstPoint,
        end: this.secondPoint,
      };
      this.drawLine(line);
      this.drawLineLabel(line);
    }
  }

  onMouseUp(evt) {
    this.clickState.sendMessage('mouseUp');
    if (this.clickState.currentState === this.clickState.States.OFF) {
      this.clearCanvas();
      let line = {
        start: this.firstPoint,
        end: this.secondPoint,
      };
      this.drawLine(line);
      this.drawLineLabel(line);
    }
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
