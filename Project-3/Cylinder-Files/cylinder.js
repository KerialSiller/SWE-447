"use strict"

var gl = undefined;

var Cylinder = {
    // object properties
    positions : {
      numComponents : 3
    },
    indices : {},
    init : function () {
      var numSides = 8;
      var dTheta = 2.0 * Math.PI / numSides;
      
      var positions = [ 0.0, 0.0, 0.0 ]; // start our positions list with the center point
      var indices = [0]; // start with the center of the triangle fan
      
      for (var i = 0; i < numSides; ++i) {
        var theta = i * dTheta;
        var x = Math.cos(theta),
            y = Math.sin(theta),
            z = 0.0;
            
        positions.push(x, y, z);
        indices.push(i+1);
      }
      
      indices.push(1);  // Add in the first perimeter vertex's index to close the disk
      
      //positions.push(0.0, 0.0, 1.0);
      
      indices = indices.concat(indices);
      indices[numSides + 2] = numSides + 1; // Start with the apex vertex 

      // initialize our object's shader program
      this.program = initShaders(gl, "Cylinder-vertex-shader", "Cylinder-fragment-shader");
      
      // Create a vertex buffer for vertex positions
      this.positions.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
      
      this.indices.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
      
      this.positions.attribute = gl.getAttribLocation(this.program, "vPosition");
    },
    draw : function () {
      gl.useProgram(this.program);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
      gl.vertexAttribPointer(this.positions.attribute, this.positions.numComponents,
        gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttrib(this.positions.attribute);
      
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
      
      // Render the base of the cylinder
      var count = 10; // see init(). // use this.baseCount instead later
      var offset = 0; // start at the beginning of the buffer
      gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset);
      
      count = 10;
      offset = 10 * /* sizeof(unsigned short) = */ 2;
      gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset);
    }
};
