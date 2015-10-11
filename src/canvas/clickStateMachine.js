'use strict';

var States = {
  OFF: 0,
  FIRSTPOINT: 1,
  ACTIVE: 2,
  SECONDPOINT: 3,
};

class ClickStateMachine {

  constructor(props) {
    this.currentState = States.OFF;
  }

  sendMessage(message) {
    if (message === "mouseDown") {
      if (this.currentState === States.OFF) {
        this.currentState = States.FIRSTPOINT;
      }
    }

    if (message === "mouseMove") {

    }

    if (message === "mouseUp") {
      if (this.currentState === States.FIRSTPOINT) {
        this.currentState = States.ACTIVE;
      } else {
        this.currentstate = States.OFF;
      }
    }
  }
}

ClickStateMachine.prototype.States = States;

module.exports = ClickStateMachine;
