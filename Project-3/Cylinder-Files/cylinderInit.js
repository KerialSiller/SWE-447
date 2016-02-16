"use strict"
var gl = undefined;
var canvas;

function init() {
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { return };
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	Cylinder.init();
	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	Cylinder.draw();
}

function resize() {
  var width = canvas.clientWidth, height = canvas.clientHeight;
  
  gl.viewport(0, 0, width, height);
  
  aspect = width/height;
  
  P = perspective(fovy, aspect, near, far);
}

window.onload = init;

window.onresize = resize;
