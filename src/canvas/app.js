'use strict'

var ClickStateMachine = require('./ClickFSM');
var IntervalTree = require('../IntervalSearchTree');
var DrawingBoard = require('./DrawingBoard');

class App {
  constructor(props) {
    this.clickState = new ClickStateMachine();
    this.intervalTree = new IntervalTree();
    this.drawingBoard = new DrawingBoard({
      ctx: props.ctx,
      el: props.el
    });
  }

  onMouseDown(evt) {
    this.clickState.sendMessage('mouseDown');

    let coord = this.drawingBoard.coordFromEvt(evt);

    if (this.clickState.currentState === this.clickState.States.MOVING_FIRST_POINT) {
      this.firstPoint = coord;
      this.drawingBoard.drawPoint(coord);
    }
  }

  onMouseMove(evt) {
    this.clickState.sendMessage('mouseMove');

    let coord = this.drawingBoard.coordFromEvt(evt);
    let isMovingFirstPoint = this.clickState.currentState === this.clickState.States.MOVING_FIRST_POINT;
    let isMovingSecondPoint = this.clickState.currentState === this.clickState.States.MOVING_SECOND_POINT;

    if (isMovingFirstPoint) {
      this.firstPoint = coord;
      this.drawingBoard.clearCanvas();
      this.drawingBoard.drawPoint(coord);
    } else if (isMovingSecondPoint) {
      let userWantsAStraightLine = evt.shiftKey;

      if (userWantsAStraightLine) {
        this.secondPoint = {x: coord.x, y: this.firstPoint.y};
      } else {
        this.secondPoint = coord;
      }

      // Construct the line
      let line = {
        start: this.firstPoint,
        end: this.secondPoint,
      };

      this.drawingBoard.clearCanvas();
      this.drawingBoard.drawLine(line);
      this.drawingBoard.drawLineLabel(line);
    }
  }

  onMouseUp(evt) {
    this.clickState.sendMessage('mouseUp');

    let userIsDone = this.clickState.currentState === this.clickState.States.OFF;

    if (userIsDone) {
      this.drawingBoard.clearCanvas();
      let line = {
        start: this.firstPoint,
        end: this.secondPoint,
      };
      this.drawingBoard.drawLine(line);
      this.drawingBoard.drawLineLabel(line);
    }
  }
}

module.exports = App;
