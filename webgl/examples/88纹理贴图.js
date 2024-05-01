/*
 * :file description:
 * :name: /webgl/examples/88纹理贴图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-01 17:18:00
 */
import { initShader } from '../lib/common';

let canvas = document.createElement('canvas');

// 获取webgl绘图上下文
const gl = canvas.getContext('webgl');

canvas.width = 500;
canvas.height = 500;
gl.viewport(0, 0, canvas.width, canvas.height);

const vertex = `
			attribute vec4 aPosition;
      attribute vec2 aTextCoord;
      varying  vec2 vTextCoord;
			void main() {
				gl_Position =  aPosition;
        vTextCoord = aTextCoord;
			}
		`;
const fragment = `
			precision highp float;

      uniform sampler2D uSample1;
      uniform sampler2D uSample2;
      varying  vec2 vTextCoord;
			void main(){
        vec4 imgColor1 = texture2D(uSample1, vTextCoord);
        vec4 imgColor2 = texture2D(uSample2, vTextCoord);
				gl_FragColor = imgColor1 * imgColor2;
			}
		`;

// 创建program
const program = initShader(gl, vertex, fragment);
// 获取attribute变量的数据存储位置
const aPosition = gl.getAttribLocation(program, 'aPosition');
const aTextCoord = gl.getAttribLocation(program, 'aTextCoord');
const uSample1 = gl.getUniformLocation(program, 'uSample1');
const uSample2 = gl.getUniformLocation(program, 'uSample2');
// 创建缓冲区对象
const buffer = gl.createBuffer();
// 绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 传入的数据
const vertices = new Float32Array([
  -0.5,
  0.5,
  0.0,
  1.0, // 齐次坐标x, 齐次坐标y, uv坐标u, uv坐标v
  -0.5,
  -0.5,
  0.0,
  0.0,
  0.5,
  0.5,
  1.0,
  1.0,
  0.5,
  -0.5,
  1.0,
  0.0,
]);

const BYTES = vertices.BYTES_PER_ELEMENT;

// 开辟空间并写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 缓冲区对象分配给attribute变量
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 4, 0);
// 开启attribue缓冲区变量
gl.enableVertexAttribArray(aPosition);

gl.vertexAttribPointer(aTextCoord, 2, gl.FLOAT, false, BYTES * 4, BYTES * 2);
gl.enableVertexAttribArray(aTextCoord);

function addImage(url, textureIndex, location) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      //onload()页面加载（文本和图片）完毕的时候
      const texture = gl.createTexture(); // 创建纹理对象

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 反转Y轴
      gl.activeTexture(gl[`TEXTURE${textureIndex}`]); // 激活纹理单元
      gl.bindTexture(gl.TEXTURE_2D, texture); // 绑定纹理对象

      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // 放大处理方式
      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // 缩小处理方式
      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // 水平平铺方式
      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // 竖直平铺方式

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); // 配置纹理图像

      gl.uniform1i(location, textureIndex); // 纹理单元传递给着色器

      resolve(img);
    };
    img.onerror = () => {
      const err = new Error(`图片加载失败${url}`);
      reject(err);
    };
    img.src = url;
  });
}

Promise.all([addImage('/cat.png', 0, uSample1)]).then(() => {
  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
});

document.body.appendChild(canvas);
