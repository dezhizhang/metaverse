/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2022-08-30 23:34:33
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n
    uniform vec4 u_change;\n
    void main() {\n\
    gl_Position = a_pos + u_change ;\n\
    gl_PointSize = 25.0;\n\
}`;

const FRAG_SHADER =
    'void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}';


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


const dataVetices = new Float32Array([
    0.0,0.0,
    0.0,0.5,
    0.3,0.0,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVetices,gl.STATIC_DRAW);

const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);


const u_change = gl.getUniformLocation(program,'u_change');
let x = 0.0;
let y = 0.0;

window.addEventListener('keydown',function(ev){
    console.log(ev.code);

    if(ev.code == 'ArrowDown') {
        y -= 0.1;
    }else if(ev.code == 'ArrowUp') {
        y += 0.1;
    }else if(ev.code == 'ArrowLeft') {
        x-= 0.1;
    }else if(ev.code == 'ArrowRight') {
        x += 0.1;
    }
    run();

},false)

function run() {
    console.log(x,y);

    gl.uniform4f(u_change,x,y,0.0,0.0);
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,3);
}

run();
