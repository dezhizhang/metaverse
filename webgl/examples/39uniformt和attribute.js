/*
 * :file description: 
 * :name: /webgl/examples/39uniformt和attribute.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 15:47:48
 * :last editor: 张德志
 * :date last edited: 2022-12-03 06:03:32
 */
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_position;\n
    void main() {
        gl_Position = a_position;\n
        gl_PointSize = 25.0;\n
    }
`;

const FRAG_SHADER = `
    precision lowp float;\n
    uniform vec4 u_color;\n
    void main() {
        gl_FragColor = u_color;\n
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


const a_postion = gl.getAttribLocation(program,'a_position');
const u_color = gl.getUniformLocation(program,'u_color');
gl.vertexAttrib4f(a_postion,-0.5,0.0,0.0,1.0);
gl.uniform4f(u_color,1.0,1.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);

