const vertex = /*wgsl*/ `
@vertex
fn main(@location(0) pos:vec3<f32>) -> @builtin(position) vec4<f32> {
    return vec4(pos,1.0);
}
`;

// 片元着色器
const fragment = /*wgsl*/ `
@fragment
fn main() ->@location(0) vec4<f32>{
    return vec4<f32>(1.0,0.0,0.0,1.0);
}
`;


  async function init() {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    document.body.append(canvas);
  
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
  
    const ctx = canvas.getContext('webgpu');
  
    const format = navigator.gpu.getPreferredCanvasFormat();
  
  
    const vertexArray = new Float32Array([
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      // 三角形2对应的xyz值
      -0.5, -0.5, 0.0,
      -0.1, -0.5, 0.0,
      -0.5, -1.0, 0.0,
    ]);
  
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
      layout: 'auto',
      // 顶点属性
      vertex: {
        module: device.createShaderModule({
          code: vertex
        }),
        entryPoint: "main",
        buffers: [{
          arrayStride: 3 * 4,
          attributes: [{
            shaderLocation: 0,
            // 格式
            format: 'float32x3',
            // 偏移量
            offset: 0,
          }]
        }]
      },
      fragment: {
        module: device.createShaderModule({
          code: fragment
        }),
        targets: [{
          format
        }],
        entryPoint: 'main'
      },
      // 图元装配
      primitive: {
        topology: 'triangle-list'
      }
    })
  
  
    // 创建命令编码
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
            a:1.0
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