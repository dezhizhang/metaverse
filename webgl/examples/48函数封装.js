const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');


const vertexSource =
    'void main() {\n\
    gl_Position = vec4(-0.5, 0, 0, 1);\n\
    gl_PointSize = 10.0;\n\
}';

const fragmentSource =
    'void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}';

// create shader
function createShader(gl,type,source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    return shader;    
}

const vertexShader = createShader(gl,gl.VERTEX_SHADER,vertexSource);
const fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fragmentSource);


// program
function createProgram(gl,vertexShader,fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    return program
}

createProgram(gl,vertexShader,fragmentShader)

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);