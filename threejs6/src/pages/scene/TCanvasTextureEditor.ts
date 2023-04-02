/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TCanvasTextureEditor.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-02 19:50:05
 * :last editor: 张德志
 * :date last edited: 2023-04-02 19:58:10
 */

export default class TCanvasTextureEditor {
  private canvas: HTMLCanvasElement;
  constructor(width: number = 512, height: number = 512) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
  }
  draw(fun: (ctx: CanvasRenderingContext2D) => void):this {
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      fun(ctx);
      return this;
    } else {
      console.log(`you browser can not support canvas 2d`);
    }
    return this;
  }

  preview() {
    const canvas = this.canvas;
    canvas.style.position = 'fixed';
    canvas.style.top = '25%';
    canvas.style.left = '25%';
    document.body.appendChild(canvas);
  }
}
