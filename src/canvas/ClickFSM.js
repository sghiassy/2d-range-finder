'use strict';

var States = {
  OFF: 0,
  MOVING_FIRST_POINT: 1,
  MOVING_SECOND_POINT: 3,
};

class ClickStateMachine {

  constructor(props) {
    this.currentState = States.OFF;
  }

  sendMessage(message) {
    if (message === "mouseDown") {
      if (this.currentState === States.OFF) {
        this.currentState = States.MOVING_FIRST_POINT;
      }
    }

    if (message === "mouseMove") {

    }

    if (message === "mouseUp") {
      if (this.currentState === States.MOVING_FIRST_POINT) {
        this.currentState = States.MOVING_SECOND_POINT;
      } else {
        this.currentState = States.OFF;
      }
    }
  }
}

ClickStateMachine.prototype.States = States;

module.exports = ClickStateMachine;
