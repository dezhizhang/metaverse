/*
 * :file description: 
 * :name: /webgl/examples/102canvas坐标转极坐标.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-02 21:26:27
 * :last editor: 张德志
 * :date last edited: 2024-05-02 21:26:49
 */


const width = 400;
const height = 400;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const gl = canvas.getContext('webgl');


const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;

const fragShaderSource = `
    void main() {
        gl_FragColor = vec4(0.0,1.0,0.0,1.0);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,vertexShaderSource);
gl.shaderSource(frag,fragShaderSource);

gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

gl.linkProgram(program);
gl.useProgram(program);


window.addEventListener('click',(event) => {

    const sx = event.clientX;
    const sy = event.clientY;
    //屏幕坐标转WebGL标准设备坐标
    const x = (sx / width) * 2 - 1;
    const y = -(sy / height) * 2 + 1;
    const vertextData = new Float32Array([x,y]);

    const aPosition = gl.getAttribLocation(program,'a_position');
    gl.vertexAttrib2fv(aPosition,vertextData);
    draw();
})


function draw() {
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 渲染立方体
    gl.drawArrays(gl.POINTS, 0, 1);
}

draw();


document.body.appendChild(canvas);
