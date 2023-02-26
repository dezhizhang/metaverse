/*
 * :file description: 
 * :name: /webgl/examples/67投影矩阵.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-27 05:40:26
 */
import Matrix4 from '../lib/cuon-matrix';
import {
  initShaders
} from '../lib/cuon-utils';

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl');
const nf = document.getElementById('nearFar');



// OrthoView.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ProjMatrix * a_Position;\n' +
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

  function main() {

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

    const n = initVertexBuffers(gl);
    gl.clearColor(0,0,0,1);
    const u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');
    const projMatrix = new Matrix4();
    document.keydown = function(ev) {  keydown(ev, gl, n, u_ProjMatrix, projMatrix, nf); };
    draw(gl, n, u_ProjMatrix, projMatrix, nf);

  }

  function initVertexBuffers(gl) {
    const verticesColors = new Float32Array([
      0.0,  0.6,  -0.4,  0.4,  1.0,  0.4, // The back green one
      -0.5, -0.4,  -0.4,  0.4,  1.0,  0.4,
      0.5, -0.4,  -0.4,  1.0,  0.4,  0.4, 


     0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
     -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
      0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 
 
      0.0,  0.5,   0.0,  0.4,  0.4,  1.0, // The front blue one 
     -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
      0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 

    ]);

    const n = 9;
    const vertexColorbuffer = gl.createBuffer();

    // Write the vertex coordinates and color to the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    // Assign the buffer object to a_Position and enable the assignment
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);
    // Assign the buffer object to a_Color and enable the assignment
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if(a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return -1;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    return n;
  }



// The distances to the near and far clipping plane
var g_near = 0.0, g_far = 0.5;
function keydown(ev, gl, n, u_ProjMatrix, projMatrix, nf) {
  switch(ev.keyCode){
    case 39: g_near += 0.01; break;  // The right arrow key was pressed
    case 37: g_near -= 0.01; break;  // The left arrow key was pressed
    case 38: g_far += 0.01;  break;  // The up arrow key was pressed
    case 40: g_far -= 0.01;  break;  // The down arrow key was pressed
    default: return; // Prevent the unnecessary drawing
  }
 
  draw(gl, n, u_ProjMatrix, projMatrix, nf);    
}

function draw(gl, n, u_ProjMatrix, projMatrix, nf) {
  // Specify the viewing volume
  projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, g_near, g_far);

  // Pass the projection matrix to u_ProjMatrix
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);       // Clear <canvas>

  // Display the current near and far values
  nf.innerHTML = 'near: ' + Math.round(g_near * 100)/100 + ', far: ' + Math.round(g_far*100)/100;

  gl.drawArrays(gl.TRIANGLES, 0, n);   // Draw the triangles
}

main();

