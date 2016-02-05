"use strict"

var gl = undefined;

var Square = {
	count : 4, // because a square has four corners
	positions : {
		values : new Float32Array([
		0.0, 0.0,	// Vertex 0
		1.0, 0.0,	// Vertex 1
		0.0, 1.0,	// Vertex 3
		1.0, 1.0	// Vertex 2
		]),	
		numComponents : 2 
	},
	colors : {
		values : new Float32Array([1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1,]),
		numComponents : 3
	}
};

function init() {
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { return };
	
	var program = initShaders(
	gl,					// our WebGL context
	"vertex-shader",	// vertex shader id
	"fragment-shader");	// fragment shader id
	gl.useProgram(program);
	
	Square.positions.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Square.positions.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, Square.positions.values, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, Square.positions.numComponents, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	
	Square.colors.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Square.colors.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, Square.colors.values, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, Square.colors.numComponents, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	var start = 0;
	var count = Square.count;
	gl.drawArrays(gl.TRIANGLE_STRIP, start, count);
}

window.onload = init;
