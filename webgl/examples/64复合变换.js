/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-25 22:00:32
 */
import Matrix4 from '../lib/cuon-matrix';
import { initShaders } from '../lib/cuon-utils';

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    void main() {
        gl_Position = u_ModelMatrix * a_Position;
    }
`;

const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

function main() {
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

    const n = initVertexBuffers(gl);

    const modelMatrix = new Matrix4();

    const ANGLE = 60.0;
    const Tx = 0.5;
    modelMatrix.setTranslate(Tx,0,0);
    modelMatrix.rotate(ANGLE,0,0,1);

    const u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);
    
}
function initVertexBuffers() {
    const vertices = new Float32Array([
        0, 0.3,   -0.3, -0.3,   0.3, -0.3
    ]);

    let n = 3;

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}


main();

document.body.appendChild(canvas);


