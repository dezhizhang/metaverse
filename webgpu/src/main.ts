/*
 * :file description: 
 * :name: /webgpu/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-07-13 05:31:18
 * :last editor: 张德志
 * :date last edited: 2024-01-29 21:15:08
 */


async function  init() {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();

  const canvas = document.getElementById('canvas');

  // 配置gpu

  const context = (canvas as any)?.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format:format
  });


  // 创建顶点缓冲区表示顶点数据
  const vertexArray = new Float32Array([
    0.0,0.0,0.0,
    1.0,0.0,0.0,
    0.0,1.0,0.0
  ]);

  const vertexBuffer = (device as any)?.createBuffer({
    size:vertexArray.byteLength,
    usege:GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
  });

  device?.queue.writeBuffer(vertexBuffer,0,vertexArray);

  // const vertexBuffer = (device as  any)?.createBuffer({
  //   size:vertexArray.byteLength,
  // });

  const pipeline = (device as any)?.createRenderPipeline({
    vertex:{
      buffers:[]
    }
  });
  

  console.log('vertexBuffer',vertexBuffer);

  


  
}

init();


