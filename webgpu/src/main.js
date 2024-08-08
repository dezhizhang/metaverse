
async function init() {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;

  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  const ctx = canvas.getContext('webgpu');


  const format = navigator.gpu.getPreferredCanvasFormat();

  // 设置gup设置对像
  ctx.configure({
    device,
    format, //颜色格式
  });

  document.body.append(canvas);

}

init();