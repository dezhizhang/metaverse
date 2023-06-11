/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-06-12 07:18:56
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
const gl = canvas.getContext('webgl');

const vertexSource = `
    void main() {
        gl_Position = vec4(0.0,0.0,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;

const fragmentSource = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;

// 创建shader
function createShader(gl,type,source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);

    // 获取编译信息
    let completed = gl.getShaderParameter(shader,gl.COMPILE_STATUS);

    if(!completed) {
        console.log(gl.getShaderInfoLog(shader));
        return
    }

    return shader;

}

const vertexShader = createShader(gl,gl.VERTEX_SHADER,vertexSource);
const fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fragmentSource);


function createProgram(gl,vertexShader,fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}

const program = createProgram(gl,vertexShader,fragmentShader);


gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);


