/*
 * :file description:
 * :name: /webgpu/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-14 15:44:37
 * :last editor: 张德志
 * :date last edited: 2024-04-14 15:49:22
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

async function render() {
  const adapter: any = await navigator.gpu.requestAdapter();

  const device = await adapter.requestDevice();
  const format = navigator.gpu.getPreferredCanvasFormat();

  const ctx: any = canvas.getContext('webgpu');
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

  const fragment = /*wgsl*/ `
  @fragment
  fn main() ->@location(0) vec4<f32> {
    return vec4<f32>(1.0,0.0,0.0,1.0);
  }
  `;

  //
  device.queue.writeBuffer(vertexBuffer, 0, vertexArray);

  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: device.createShaderModule({ code: vertex }),
      entryPoint: 'main',
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
    fragment: {
      module: device.createShaderModule({ code: fragment }),
      entryPoint: 'main',
      targets: [
        {
          format,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  });

  const commandEncoder = device.createCommandEncoder();
  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [
      {
        view: ctx.getCurrentTexture().createView(),
        storeOp: 'store',
        loadOp: 'clear',
        clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
      },
    ],
  });

  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0, vertexBuffer);

  renderPass.draw(3);
  renderPass.end();

  const commandBuffer = commandEncoder.finish();

  device.queue.submit([commandBuffer]);
}

render();
