/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:25:20
 * :last editor: 张德志
 * :date last edited: 2024-05-05 23:08:15
 */
// const canvas = document.getElementById('canvas');
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
  void main() {
    gl_Position = vec4(0.0,0.0,0.0,1.0);
    gl_PointSize = 512.0;
  }
`;

const fragShaderSource = `
  precision mediump float;
  mat4 m = mat4(
    255.0,0.0,0.0,255.0,
    255.0, 255.0,0.0, 255.0,
    0.0, 255.0,0.0, 255.0,
    0.0,0.0, 255.0, 255.0,
  );
  void main() {
     gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    float dist = distance(gl_PointCoord,vec2(0.5,0.5));
    if(dist >=0.0 && dist <0.125) {
      gl_FragColor = m[0] / 255.0;
    }else if(dist >=0.125 && dist < 0.25) {
      gl_FragColor = m[1] / 255.0;
    }else if(dist >=0.25 && dist < 0.375) {
      gl_FragColor = m[2] / 255.0;
    }else if(dist >=0.325 && dist < 0.5) {
      gl_FragColor = m[3] / 255.0;
    }else {
      discard;
    }
   
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragShader, fragShaderSource);

gl.compileShader(vertexShader);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragShader);

gl.linkProgram(program);
gl.useProgram(program);


gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, 1);

document.body.appendChild(canvas);
