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

  // 设置gup设置对像
  ctx.configure({
    device,
    format, //颜色格式
  });

  // 创建顶点缓冲区数据
  const vertexArray = new Float32Array([
    0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
  ]);

  const vertexBuffer = device.createBuffer({
    // 缓冲区的长度
    size: vertexArray.byteLength,
    // 缓冲区顶点
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  // 顶点数据写入到缓冲区
  device.queue.writeBuffer(vertexBuffer, 0, vertexArray);

  // 创建渲染管线
  const pipeline = device.createRenderPipeline({
    layout: "auto",
    // 顶点属性
    vertex: {
      module: device.createShaderModule({ code: vertex }),
      entryPoint: "main",
      buffers: [
        {
          // 顶点占用字节长度
          arrayStride: 3 * 4,
          attributes: [
            {
              // gpu显存上顶点缓冲区标记存储位置
              shaderLocation: 0,
              // 格式
              format: "float32x3",
              // 偏移量
              offset: 0,
            },
          ],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({ code: fragment }),
      targets:[
        {
          format,
        }
      ],
      entryPoint: "main",
    },
    // 图元装配
    primitive: {
      topology: "triangle-list",
    },
  });

  // 创建命令编码器
  const commandEncoder = device.createCommandEncoder();
  // 创建渲染通道
  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [
      {
        view: ctx.getCurrentTexture().createView(),
        storeOp: "store", // 像素数据写入颜色缓冲区
        loadOp: "clear",
        clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
      },
    ],
  });

  // 设置该渲染通道对应的渲染管线
  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0,vertexBuffer);
  // 绘制
  renderPass.draw(3);
  // 结束
  renderPass.end();
  // 创建命令缓冲区
  const commandBuffer = commandEncoder.finish();
  device.queue.submit([commandBuffer]);

  console.log("vertexBuffer", vertexBuffer);
}

init();
