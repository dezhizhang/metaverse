/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-11-29 06:37:29
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

gl.clearColor(1.0,0.0,1.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const VERTEX_SHADER =
`
attribute vec4 a_Position;\n
void main() {\n\
    gl_Position = a_Position;\n\
    gl_PointSize = 10.0;\n\
}`;

const FRAG_SHADER =
    'void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}';

document.body.appendChild(canvas);

