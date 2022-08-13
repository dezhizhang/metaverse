/*
 * :file description: 
 * :name: /webgl/lib/common.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-08 08:04:32
 * :last editor: 张德志
 * :date last edited: 2022-08-08 22:40:30
 */
export function initShaders(gl, vShader_s, fShader_s) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vShader_s)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fShader_s)
   
    const program = createProgram(gl, vertexShader, fragmentShader)
    // 使用程序对象
    gl.useProgram(program)

    gl.program = program
}

export function createShader(gl, type, shaderSource) {
    // 创建shader
    const shader = gl.createShader(type)
    // 填充source
    gl.shaderSource(shader, shaderSource)
    // 编译shader
    gl.compileShader(shader)

    return shader
}

export function createProgram(gl, vShader, fShader) {
    // 创建程序对象
    const program = gl.createProgram()

    // 为程序对象分配着色器对象
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)

    // 连接程序对象
    gl.linkProgram(program)
    return program
}