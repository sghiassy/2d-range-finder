'use strict';

// var BinarySearchTree = require('./src/BinarySearchTree');
var Node = require('./src/Node');

class IntervalTree {
  constructor(props) {
    this.HEAD = undefined;
  }

  addInterval(interval) {
    var isFirstInterval = this.HEAD === undefined;

    if (isFirstInterval) {
      this.HEAD = new Node({
        leftIndex: interval.leftIndex,
        rightIndex: interval.rightIndex,
        maxRightIndex: interval.rightIndex
      });
    } else {
      addNodeToTree(this.HEAD, interval);
    }
  }

  removeInterval(interval) {

  }

  findIntersection(interval) {

  }
}

/**
 * Recursive function to add an interval to a Binary Search Tree
 */
function addNodeToTree(node, interval) {
  if (node === undefined) {
    return undefined;
  }

  if (interval.leftIndex > node.leftIndex) {
    var childNode = addNodeToTree(node.rightChild, interval);
  } else {
    var childNode = addNodeToTree(node.leftChild, interval);
  }

  if (childNode === undefined) {
    var childNode = new Node({
      leftIndex: interval.leftIndex,
      rightIndex: interval.rightIndex,
      maxRightIndex: interval.maxRightIndex
    });

    if (childNode.leftIndex > node.leftIndex) {
      node.rightChild = childNode;
    } else {
      node.leftChild = childNode;
    }
  }

  if (childNode.maxRightIndex > node.maxRightIndex) {
    node.maxRightIndex = childNode.maxRightIndex;
  }

  return node;
}

module.exports = IntervalTree;
