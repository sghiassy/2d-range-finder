'use strict';

var States = {
  OFF: 0,
  ACTIVE: 1,
  DONE: 2,
};

class ClickStateMachine {

  constructor(props) {
    this.currentState = States.OFF;
  }

  sendMessage(message) {
    // since this state machine is binary, the message doesn't actually matter
    if (this.currentState === States.OFF) {
      this.currentState = States.ACTIVE;
    } else if (this.currentState === States.ACTIVE) {
      this.currentState = States.DONE;
    } else {
      this.currentState = States.ACTIVE;
    }
  }
}

ClickStateMachine.STATES = States;

module.exports = ClickStateMachine;
