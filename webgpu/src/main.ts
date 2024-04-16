/*
 * :file description:
 * :name: /webgpu/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-14 15:44:37
 * :last editor: 张德志
 * :date last edited: 2024-04-16 08:03:55
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

async function render() {
  const adapter: any = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  const format = await navigator.gpu.getPreferredCanvasFormat();

  const context = canvas.getContext('webgpu');

  context?.configure({
    device,
    format,
  });

  const vertexArray = new Float32Array([0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]);

  const mat4Array = new Float32Array([
    0.2, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0,
  ]);

  const vertexBuffer = device.createBuffer({
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  const met4Buffer = device.createBuffer({
    size: mat4Array.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const vertex = /*wgsl*/ `
  @group(0) @binding(0) var <uniform> s:mat4x4<f32>;
  @vertex
  fn main(@location(0) position:vec3<f32>) ->@builtin(position) vec4<f32> {
    return vec4(position,1.0) * s;
  }
  `;

  const fragment = /*wgsl*/ `
  @fragment
  fn main() ->@location(0) vec4<f32> {
    return vec4<f32>(1.0,0.0,0.0,1.0);
  }
  `;

  device.queue.writeBuffer(vertexBuffer, 0, vertexArray);
  device.queue.writeBuffer(met4Buffer, 0, mat4Array);
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

  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: met4Buffer },
      },
    ],
  });

  const commandEncoder = device.createCommandEncoder();
  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [
      {
        view: context?.getCurrentTexture().createView(),
        storeOp: 'store',
        loadOp: 'clear',
        clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
      },
    ],
  });
  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0, vertexBuffer);
  renderPass.setBindGroup(0, bindGroup);

  renderPass.draw(3);
  renderPass.end();

  const commandBuffer = commandEncoder.finish();
  device.queue.submit([commandBuffer]);
}

render();
