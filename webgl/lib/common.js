/*
 * :file description: 
 * :name: /webgl/lib/common.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-08 08:04:32
 * :last editor: 张德志
 * :date last edited: 2022-12-03 06:22:44
 */

export function initShader(gl,VERTEX_SHADER,FRAG_SHADER) {
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
    return program
}

