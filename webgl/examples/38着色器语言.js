/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 15:47:48
 * :last editor: 张德志
 * :date last edited: 2022-12-02 23:34:12
 */
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    void main() {
        gl_Position = vec4(0.0,0.0,0.0,1.0);\n
        gl_PointSize = 10.0;\n
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1,0,0,1);\n
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

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);

