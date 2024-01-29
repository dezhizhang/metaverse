/*
 * :file description: 
 * :name: /webgpu/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-07-13 05:31:18
 * :last editor: 张德志
 * :date last edited: 2024-01-29 22:55:23
 */

async function initwebgpu() {
  const adapter =await (navigator.gpu as any).requestAdapter();
  const device =await adapter?.requestDevice();


  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "#00000";

  const context = canvas.getContext('webgpu');
  const format  = navigator.gpu.getPreferredCanvasFormat();

  context?.configure({
    device:device,
    format:format,
   
  });

  document.body.appendChild(canvas);


}

initwebgpu();

