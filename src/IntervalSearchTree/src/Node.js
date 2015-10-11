'use strict';

class Node {
  constructor(props) {
    this.leftIndex = props.leftIndex;
    this.rightIndex = props.rightIndex;
    this.maxRightIndex = props.maxRightIndex;

    // define children
    this.leftChild = undefined;
    this.rightChild = undefined;
  }
}

module.exports = Node;
