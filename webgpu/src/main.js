import { vertex, fragment } from "./shader";

async function init() {
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  document.body.append(canvas);

  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  const ctx = canvas.getContext("webgpu");

  const format = navigator.gpu.getPreferredCanvasFormat();

  // 设置gup配置对像
  ctx.configure({
    device,
    format,
  });

  // 创建顶点缓冲区数据
  const vertexArray = new Float32Array([
    0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
  ]);

  // 创建顶点缓冲区
  const vertexBuffer = device.createBuffer({
    // 缓冲区的长度
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  // 顶点数据写入到缓冲区
  device.queue.writeBuffer(vertexBuffer, 0, vertexArray);

  const colorArray = new Float32Array([
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
  ]);

  const colorBuffer = device.createBuffer({
    size: vertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(colorBuffer, 0, colorArray);

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
        {
          arrayStride: 3 * 4,
          attributes: [
            {
              shaderLocation: 1,
              format: "float32x3",
              offset: 0,
            },
          ],
        },
      ],
    },
    fragment:{
      module:device.createShaderModule({code:fragment}),
      targets:[
        {
          format
        }
      ],
      entryPoint:"main",
    },
    primitive:{
      topology:"triangle-list"
    }
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
          a:1,
        }
      }
    ]
  });

  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0,vertexBuffer);
  renderPass.setVertexBuffer(1,colorBuffer);
  renderPass.draw(3);
  renderPass.end();

  // 创建命令缓冲区
  const commandBuffer = commandEncoder.finish();
  device.queue.submit([commandBuffer]);


}

init();


https://www.bilibili.com/video/BV1uN411M7Km/?spm_id_from=333.788&vd_source=10257e657caa8b54111087a9329462e8
