/*
 * :file description: 
 * :name: /webgpu/examples/绘制两个三角形.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-14 16:52:31
 * :last editor: 张德志
 * :date last edited: 2024-04-14 16:53:02
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

async function render() {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  const format = await navigator.gpu.getPreferredCanvasFormat();

  const context = canvas.getContext('webgpu');
  context?.configure({
    device,
    format,
  });

  const vertexArray = new Float32Array([
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    //
    -0.5,-0.5,0.0,
    -1.0,-0.5,0.0,
    -0.5,-1.0,0.0,
  ]);
  

  const vertexBuffer = device.createBuffer({
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  const vertex = /*wgsl*/ `
  @vertex
  fn main(@location(0) position:vec3<f32>) ->@builtin(position) vec4<f32> {
    var gl_Position = vec4(position,1.0);
    return gl_Position;
  }
  `;

  const fragment = /*wgsl*/ `
  @fragment
  fn main() ->@location(0) vec4<f32> {
    return vec4<f32>(0.0,1.0,0.0,1.0);
  }
  `;

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
    fragment:{
      module:device.createShaderModule({code:fragment}),
      entryPoint:'main',
      targets:[
        {
          format,
        }
      ]
    },
    primitive:{
      topology:'triangle-list'
    }
  });

  const commandEncoder = device.createCommandEncoder();
  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments:[
      {
        view:context?.getCurrentTexture().createView(),
        storeOp:'store',
        loadOp:'clear',
        clearValue:{r:0.5,g:0.5,b:0.5,a:1.0},
      }
    ]
  });

  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0,vertexBuffer);

  renderPass.draw(6);
  renderPass.end();

  const commandBuffer = commandEncoder.finish();
  device.queue.submit([commandBuffer]);
  
}

render();
