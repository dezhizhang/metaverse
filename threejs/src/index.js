/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-14 14:43:01
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.background = 'rgba(0,0,0,1)';

document.body.appendChild(canvas);

async function render() {
  const adapter = await navigator.gpu.requestAdapter();

  const device = await adapter.requestDevice();
  const format = navigator.gpu.getPreferredCanvasFormat();

  const ctx = canvas.getContext('webgpu');
  ctx.configure({
    device,
    format,
  });

  // 创建顶点缓冲区数据
  const vertexArray = new Float32Array([0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]);

  const vertexBuffer = device.createBuffer({
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  const vertex = /*wgsl*/ `
   @vertex
   fn main(@location(0) pos:vec3<f32>) ->@builtin(position) vec4<f32> {
      var pos2 = vec4<f32>(pos,1.0);
      pos2.x -= 0.2;
      return pos2;
   }
  `;

  //
  device.queue.writeBuffer(vertexBuffer, 0, vertexArray);

  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      buffers: [
        {
          arrayStride: 3 * 4,
          attributes: [
            {
              shaderLocation: 0,
              format: 'float32x3',
              offset: 0,
            },
          ],
        },
      ],
    },
  });

  console.log('vertexBuffer', vertexBuffer);
}

render();
