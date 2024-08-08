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
    layout:'auto',
    vertex: {
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
  });

  console.log("vertexBuffer", vertexBuffer);
}

init();
