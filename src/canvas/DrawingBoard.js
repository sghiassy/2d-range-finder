'use strict';

class DrawingBoard {
  constructor(props) {
    this.el = props.el;

    // Setup Draw Context
    this.ctx = props.ctx;
    this.ctx.font = "10px Arial";
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

module.exports = DrawingBoard;
