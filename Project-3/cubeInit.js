"use strict"
var gl = undefined;

function init() {
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { return };
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	Cube.init();	
	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	Cube.draw();
}

window.onload = init;
