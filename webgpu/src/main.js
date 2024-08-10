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
    0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
    // 三角形2对应的xyz值
    -0.5, -0.5, 0.0, -0.1, -0.5, 0.0, -0.5, -1.0, 0.0,
  ]);

  // const mat4T = glMatrix.mat4.fromValues(1,0,0,0, 0,1,0,0,0,0,1,0,1,2,3,1);
  // console.log('mat4',mat4T);

  // 单位矩阵
  const mat4 = glMatrix.mat4.create();
  console.log('mat4',mat4);
  


  const vertexBuffer = device.createBuffer({
    // 缓冲区的长度
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(vertexBuffer, 0, vertexArray);

  ctx.configure({
    device,
    format,
  });

  // 创建渲染管线
  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: device.createShaderModule({ code: vertex }),
      entryPoint: "main",
      buffers: [
        {
          arrayStride: 3 * 4,
          attributes: [
            {
              shaderLocation: 0,
              format: "float32x3",
              offset: 0,
            },
          ],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({ code: fragment }),
      targets: [
        {
          format,
        },
      ],
    },
    // 图元装配
    primitive: {
      topology: "triangle-list",
    },
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
          r:0.5,
          g:0.5,
          b:0.5,
          a:1.0,
        }
      }
    ]
  });

  // 设置渲染管线
  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0,vertexBuffer);

  renderPass.draw(6);
  renderPass.end();

  // 创建命令缓冲区
  const commandBuffer = commandEncoder.finish();
  device.queue.submit([commandBuffer]);




}

init();
