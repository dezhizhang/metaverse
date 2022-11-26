/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-11-26 22:56:40
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    attribute float a_size;\n\
    void main() {\n\
    gl_Position = a_pos;\n\
    gl_PointSize = 10.0;\n\
}`;

const FRAG_SHADER =
    `
    precision mediump float;\n\
    uniform vec4 u_color;\n\
    void main() {\n\
    gl_FragColor = vec4(1.0,0.0,1.0,1.0);\n\
}`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

//边接几何体
gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const a_position = gl.getAttribLocation(program,'a_pos');
// const a_size = gl.getAttribLocation(program,'a_size');
// const u_color = gl.getUniformLocation(program,'u_color');

gl.vertexAttrib4f(a_position,0.0,0.0,1.0,1.0);
// gl.vertexAttrib1f(a_size,100.0);
// // gl.uniform4f(u_color,1.0,1.0,0.0,1.0);
// const color = new Float32Array([1.0,0.0,1.0,1.0]);
// gl.uniform4fv(u_color,color);

gl.drawArrays(gl.POINTS,0,1);

canvas.addEventListener('click',(event) => {
    const {clientX,clientY} = event;
    const {left,right,width,height} = canvas.getBoundingClientRect();

    const [cssX,cssY] = [
        clientX - left,
        clientY - right
    ];

    // 解决坐标原点位置差异
    const [halfWidth,halfHeight] = [width / 2,height / 2];

    const [xBaseCenter,yBasecenter] = [
        cssX - halfWidth,
        cssY - halfHeight
    ];

    // 解决y方向差异
    const yBasecenterTop = -yBasecenter;

    // 解决坐标基底的差异
    const [x,y] = [xBaseCenter / halfWidth,yBasecenterTop / halfHeight];

    // gl.vertexAttrib2f(a_position,x,y);
    gl.vertexAttrib4f(a_position,x,y,1.0,1.0);
    // gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS,0,1);

    document.body.appendChild(canvas);
    
    console.log(x,y);
    
});

document.body.appendChild(canvas);




