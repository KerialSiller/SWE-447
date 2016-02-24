/////////////////////////////////////////////////////////////////////////////
//
//  Solar.js
//
/////////////////////////////////////////////////////////////////////////////

"use strict";

//---------------------------------------------------------------------------
//
//  Declare our "global" variables, including the array of planets (each of
//    which is a sphere)
//

var canvas = undefined;
var gl = undefined;

// The list of planets to render.  Uncomment any planets that you are 
// including in the scene For each planet in this list, make sure to 
// set its distance from the sun, as well its size and colors 
var Planets = {
  Sun : new Sphere(),
  Mercury : new Sphere(),
  Venus : new Sphere(),
  Earth : new Sphere(),
  Moon : new Sphere(),
  Mars : new Sphere(),
  Jupiter : new Sphere(),
  Saturn : new Sphere(),
  Uranus : new Sphere(),
  Neptune : new Sphere(),
  Pluto : new Sphere()
};

// Viewing transformation parameters
var V = undefined;  // matrix storing the viewing transformation

// Projection transformation parameters
var P = undefined;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 120;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is 
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime

// An angular velocity that could be applied to 
var angularVelocity = Math.PI / 10;

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Initialize the planets in the Planets list, including specifying
  // necesasry shaders, shader uniform variables, and other initialization
  // parameters.  This loops adds additinoal properties to each object
  // in the Planets object;
  for (var name in Planets ) {
    
    var p = Planets[name];

    p.vertexShader = "Planet-vertex-shader";
    p.fragmentShader = "Planet-fragment-shader";

    p.init(18,8); 

    p.uniforms = { 
      color : gl.getUniformLocation(p.program, "color"),
      MV : gl.getUniformLocation(p.program, "MV"),
      P : gl.getUniformLocation(p.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {
  time += timeDelta;

  var ms = new MatrixStack();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Specify the viewing transformation, and use it to initialize the 
  // matrix stack
  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);  

  // Note: You may want to find a way to use this value in your
  //  application
  var angle = time * angularVelocity;

  //
  // Render the Sun.  Here we create a temporary variable to make it
  //  simpler to work with the various properties.
  //

  var Sun = Planets.Sun;
  var radius = SolarSystem.Sun.radius;
  var color = SolarSystem.Sun.color;

  ms.push();
  ms.scale(radius);
  gl.useProgram(Sun.program);
  gl.uniformMatrix4fv(Sun.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Sun.uniforms.P, false, flatten(P));
  gl.uniform4fv(Sun.uniforms.color, flatten(color));
  Sun.pointMode = true;
  Sun.draw();
  ms.pop();

  //
  //  Add your code for more planets here!
  //
  
  // Mercury  
  var Mercury = Planets.Mercury;
  radius = SolarSystem.Mercury.radius;
  color = SolarSystem.Mercury.color;
  var distance = SolarSystem.Mercury.distance;
  var planetaryScale = 15;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Mercury.program);
  gl.uniformMatrix4fv(Mercury.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Mercury.uniforms.P, false, flatten(P));
  gl.uniform4fv(Mercury.uniforms.color, flatten(color));
  Mercury.draw();
  ms.pop();
  
  // Venus
  var Venus = Planets.Venus;
  radius = SolarSystem.Venus.radius;
  color = SolarSystem.Venus.color;
  distance = SolarSystem.Venus.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Venus.program);
  gl.uniformMatrix4fv(Venus.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Venus.uniforms.P, false, flatten(P));
  gl.uniform4fv(Venus.uniforms.color, flatten(color));
  Venus.draw();
  ms.pop();
  
  // Earth, third rock from the Sun, and the Moon
  var Earth = Planets.Earth;
  var Moon = Planets.Moon;
  radius = SolarSystem.Earth.radius;
  color = SolarSystem.Earth.color;
  distance = SolarSystem.Earth.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Earth.program);
  gl.uniformMatrix4fv(Earth.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Earth.uniforms.P, false, flatten(P));
  gl.uniform4fv(Earth.uniforms.color, flatten(color));
  Earth.draw();
  ms.translate(Moon.distance, 0, 0);
  ms.scale(Moon.radius);
  Moon.draw();
  ms.pop();
  
  // Mars
  var Mars = Planets.Mars;
  radius = SolarSystem.Mars.radius;
  color = SolarSystem.Mars.color;
  distance = SolarSystem.Mars.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Mars.program);
  gl.uniformMatrix4fv(Mars.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Mars.uniforms.P, false, flatten(P));
  gl.uniform4fv(Mars.uniforms.color, flatten(color));
  Mars.draw();
  ms.pop();
  
  // Jupiter
  var Jupiter = Planets.Jupiter;
  radius = SolarSystem.Jupiter.radius;
  color = SolarSystem.Jupiter.color;
  distance = SolarSystem.Jupiter.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Jupiter.program);
  gl.uniformMatrix4fv(Jupiter.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Jupiter.uniforms.P, false, flatten(P));
  gl.uniform4fv(Jupiter.uniforms.color, flatten(color));
  Jupiter.draw();
  ms.pop();
  
  // Saturn
  var Saturn = Planets.Saturn;
  radius = SolarSystem.Saturn.radius;
  color = SolarSystem.Saturn.color;
  distance = SolarSystem.Saturn.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Saturn.program);
  gl.uniformMatrix4fv(Saturn.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Saturn.uniforms.P, false, flatten(P));
  gl.uniform4fv(Saturn.uniforms.color, flatten(color));
  Saturn.draw();
  ms.pop();
  
  // Uranus
  var Uranus = Planets.Uranus;
  radius = SolarSystem.Uranus.radius;
  color = SolarSystem.Uranus.color;
  distance = SolarSystem.Uranus.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Uranus.program);
  gl.uniformMatrix4fv(Uranus.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Uranus.uniforms.P, false, flatten(P));
  gl.uniform4fv(Uranus.uniforms.color, flatten(color));
  Uranus.draw();
  ms.pop();
  
  // Neptune
  var Neptune = Planets.Neptune;
  radius = SolarSystem.Neptune.radius;
  color = SolarSystem.Neptune.color;
  distance = SolarSystem.Neptune.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Neptune.program);
  gl.uniformMatrix4fv(Neptune.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Neptune.uniforms.P, false, flatten(P));
  gl.uniform4fv(Neptune.uniforms.color, flatten(color));
  Neptune.draw();
  ms.pop();
  
  // Pluto
  var Pluto = Planets.Pluto;
  radius = SolarSystem.Pluto.radius;
  color = SolarSystem.Pluto.color;
  distance = SolarSystem.Pluto.distance;
  
  ms.push();
  ms.rotate(angle, [0, 1, 0]);
  ms.translate(distance * planetaryScale * Math.sin(angularVelocity), 0, distance * planetaryScale * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Pluto.program);
  gl.uniformMatrix4fv(Pluto.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Pluto.uniforms.P, false, flatten(P));
  gl.uniform4fv(Pluto.uniforms.color, flatten(color));
  Pluto.draw();
  ms.pop();

  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 160.0; // degrees, originally 120
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;