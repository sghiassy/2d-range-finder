var a_canvas = document.getElementById("mainCanvas");

var draw_b = function() {
  var b_canvas = document.getElementById("mainCanvas");
  var ctx = b_canvas.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
}

module.exports = draw_b;
