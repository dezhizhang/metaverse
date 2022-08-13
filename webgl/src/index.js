/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-08-13 11:49:25
 */
import { initShaders } from  '../lib/common';
import Matrix4 from '../lib/cuon-matrix'
const canvas = document.querySelector('#canvas')
const gl = canvas.getContext('webgl2')
const clearColor = [1.0, 1.0, 1.0, 1.0]

const angleSpeed = 45

// shader
const vShader_s = `
    attribute vec4 a_Position;
    uniform mat4 u_Matrix;
    void main() {
        gl_Position = u_Matrix * a_Position;
    }
`
const fShader_s = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`
initShaders(gl, vShader_s, fShader_s)

const matrix = new Matrix4()



/// 获取u_Matrix存储地址
const u_Matrix = gl.getUniformLocation(gl.program, 'u_Matrix')

gl.uniformMatrix4fv(u_Matrix, false, matrix.elements)

const n = initVertexBuffers(gl)

// 设置清除画布的颜色
gl.clearColor(...clearColor)


let currentAngle = 0.0;

const tick = function() {
    currentAngle = animate(currentAngle);
    draw(gl, n, currentAngle, matrix, u_Matrix);
    requestAnimationFrame(tick);
}

tick();


// -----------------------------------
function draw(gl, n, currentAngle, modeMatrix, u_Matrix) {
    modeMatrix.setRotate(currentAngle, 0, 0, 1)
    gl.uniformMatrix4fv(u_Matrix, false, modeMatrix.elements)

    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLES, 0, n)
}

function animate(angle) {
    angle += angleSpeed / 60
    return angle %= 360
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        0.0, 0.5,
        - 0.5, -0.5,
        0.5, -0.5
    ]);

    const size = 2;

    // 点的个数
    const n = vertices.length / 2;
    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer();

    // 将缓冲区对象绑定到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    // 获取a_Position存储地址
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    // 将缓冲区对象分配给a_Position
    gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)

    // 连接a_Positon变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position)

    return n
}
