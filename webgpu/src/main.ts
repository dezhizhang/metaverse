/*
 * :file description: 
 * :name: /webgpu/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-07-13 05:31:18
 * :last editor: 张德志
 * :date last edited: 2024-01-28 21:36:39
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
  console.log('canvas',context);
  
}

init();


