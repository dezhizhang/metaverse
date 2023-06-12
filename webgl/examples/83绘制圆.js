/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-06-13 04:48:38
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = 2.0;
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

gl.linkProgram(program);
gl.useProgram(program);



gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

let x = 0;
let y = 0;
let n = 1000;
let r = 0.5;
for(let i=0;i < n;i++) {
    x = Math.sin(i) * r;
    y = Math.cos(i) * r;

    const aPosition = gl.getAttribLocation(program,'a_position');
    gl.vertexAttrib2f(aPosition,x,y);
    console.log(aPosition)


    gl.drawArrays(gl.POINTS,0,1);
}



document.body.appendChild(canvas);


