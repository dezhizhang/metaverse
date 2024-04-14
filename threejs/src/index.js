/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-14 11:04:55
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

  const vertexArray = new Float32Array([
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0
  ]);

  const vertexBuffer = device.createBuffer({
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  console.log('vertexBuffer', vertexBuffer);
}

render();
