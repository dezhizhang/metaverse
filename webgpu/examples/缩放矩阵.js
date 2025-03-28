import * as glMatrix from 'gl-matrix';
import { vertex, fragment } from "./shader";

async function init() {
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  document.body.append(canvas);

  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  const format = await navigator.gpu.getPreferredCanvasFormat();

  const ctx = canvas.getContext("webgpu");

  const vertexArray = new Float32Array([
    0.0, 0.0, 0.0, 
    1.0,0.0, 0.0,
    0.0, 1.0, 0.0,
  ]);


  const matArray = glMatrix.mat4.create();
  glMatrix.mat4.scale(matArray,matArray,[0.1,0.1,1.0]);

  const scaleBuffer = device.createBuffer({
    size:matArray.byteLength,
    usage:GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(scaleBuffer,0,matArray);


 
  const vertexBuffer = device.createBuffer({
    // 绘冲区长度
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer,0,vertexArray);

  ctx.configure({
    device,
    format,
  });

  // 创建渲染管理
  const pipeline = device.createRenderPipeline({
    layout:'auto',
    vertex:{
      module:device.createShaderModule({code:vertex}),
      entryPoint:'main',
      buffers:[
        {
          arrayStride: 3 * 4,
          attributes:[
            {
              shaderLocation:0,
              format:'float32x3',
              offset:0,
            }
          ]
        }
      ]
    },
    fragment:{
      module:device.createShaderModule({code:fragment}),
      targets:[
        {
          format
        }
      ]
    },
    primitive:{
      topology:'triangle-list'
    }
  })

  // 设置uniform数据的绑定组
  const bindGroup = device.createBindGroup({
    layout:pipeline.getBindGroupLayout(0),
    entries:[
      {
        binding:0,
        resource:{buffer:scaleBuffer}
      }
    ]
  });

  const commandEncoder = device.createCommandEncoder();
  // 创建渲染通道
  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments:[
      {
        view:ctx.getCurrentTexture().createView(),
        storeOp:'store',
        loadOp:'clear',
        clearValue:{
          r:0,
          g:0,
          b:0,
          a:1
        }
      }
    ]
  });

  // 设置渲染管线
  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0,vertexBuffer);
  renderPass.setBindGroup(0,bindGroup);

  renderPass.draw(3);
  renderPass.end();

  // 创建命令缓冲区
  const commandBuffer = commandEncoder.finish();
  device.queue.submit([commandBuffer]);

}

init();
