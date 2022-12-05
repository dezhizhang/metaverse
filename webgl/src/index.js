/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-12-05 21:17:14
 */
// ClickedPints.js (c) 2012 matsuda
// Vertex shader program
import '../lib/webgl-utils';
import '../lib/webgl-debug';
import {getWebGLContext,initShaders} from  '../lib/cuon-utils'

const VSHADER_SOURCE = `
    attribute vec4 a_Position;\n
    void main() {
        gl_Position = a_Position;\n
        gl_PointSize = 10.0;\n
    }
`;

const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n
    }
`;

function main() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gl = getWebGLContext(canvas);
    if(!gl) {
        console.log(`Failed to get the rendering context for WebGL`);
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position);}
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    document.body.appendChild(canvas);
      // // Get the storage location of a_Position
//   var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
//   if (a_Position < 0) {
//     console.log('Failed to get the storage location of a_Position');
//     return;
//   }

//   // Register function (event handler) to be called on a mouse press
//   canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_Position); };

//   // Specify the color for clearing <canvas>
//   gl.clearColor(0.0, 0.0, 0.0, 1.0);

//   // Clear <canvas>
//   gl.clear(gl.COLOR_BUFFER_BIT);
//   document.body.appendChild(canvas);

}


const g_points = [];
function click(ev,gl,canvas,a_Position) {
    let x = ev.clientX; // x coordinate of a mouse pointer
    let y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
    g_points.push(x); g_points.push(y);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const len = g_points.length;
    for(var i = 0; i < len; i += 2) {
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
    
        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

main();
