/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-03-04 07:10:17
 */

// LookAtTriangles.js (c) 2012 matsuda
import { Matrix4,Vector4 } from '../lib/cuon-matrix';
import {
  initShaders
} from '../lib/cuon-utils';


// LookAtBlendedTriangles.js (c) 2012 matsuda and ohnishi
// LookAtTrianglesWithKey_ViewVolume.js is the original
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

  main();

  function main() {
    const canvas = document.getElementById('webgl');

    const gl = canvas.getContext('webgl');
    if(!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders');
      return;
    }

    const n = initVertexBuffers(gl);
    if(n < 0) {
      console.log('Failed to set the vertex information');
      return;
    }

    gl.clearColor(0,0,0,1);
    gl.enable(gl.BLEND);

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // get the storage locations of u_ViewMatrix and u_ProjMatrix
    var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
    if (!u_ViewMatrix || !u_ProjMatrix) { 
      console.log('Failed to get the storage location of u_ViewMatrix and/or u_ProjMatrix');
      return;
    }


    // Create the view projection matrix
    var viewMatrix = new Matrix4();
    // Register the event handler to be called on key press
    window.onkeydown = function(ev){ keydown(ev, gl, n, u_ViewMatrix, viewMatrix); };

    // Create Projection matrix and set to u_ProjMatrix
    var projMatrix = new Matrix4();
    projMatrix.setOrtho(-1, 1, -1, 1, 0, 2);
    gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

    // Draw
    draw(gl, n, u_ViewMatrix, viewMatrix);
    
  }

  function initVertexBuffers(gl) {
    const verticesColors = new Float32Array([
      0.0,  0.5,  -0.4,  0.4,  1.0,  0.4,  0.4, // The back green one
      -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,  0.4,
       0.5, -0.5,  -0.4,  1.0,  0.4,  0.4,  0.4, 
      
       0.5,  0.4,  -0.2,  1.0,  0.4,  0.4,  0.4, // The middle yerrow one
      -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,  0.4,
       0.0, -0.6,  -0.2,  1.0,  1.0,  0.4,  0.4, 
   
       0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  0.4,  // The front blue one 
      -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,  0.4,
       0.5, -0.5,   0.0,  1.0,  0.4,  0.4,  0.4, 
    ]);

    const n = 9;
    const vertexColorbuffer = gl.createBuffer();
    if(!vertexColorbuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorbuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);

    const FSIZE = verticesColors.BYTES_PER_ELEMENT;

    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
    }

    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE * 7,0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(gl.program,'a_Color');
    if(a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return -1;
    }

    gl.vertexAttribPointer(a_Color,4,gl.FLOAT,false, FSIZE * 7,FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    return n;
  
  }


function keydown(ev, gl, n, u_ViewMatrix, viewMatrix) {
    if(ev.keyCode == 39) { // The right arrow key was pressed
      g_EyeX += 0.01;
    } else 
    if (ev.keyCode == 37) { // The left arrow key was pressed
      g_EyeX -= 0.01;
    } else return;
    draw(gl, n, u_ViewMatrix, viewMatrix);    
}

// Eye position
var g_EyeX = 0.20, g_EyeY = 0.25, g_EyeZ = 0.25;
function draw(gl, n, u_ViewMatrix, viewMatrix) {
  // Set the matrix to be used for to set the camera view
  viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, 0, 0, 0, 0, 1, 0);

  // Pass the view projection matrix
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
}
