/*
 * :file description:
 * :name: /pixijs/examples/polygon.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-01 21:59:46
 * :last editor: 张德志
 * :date last edited: 2024-10-01 22:26:00
 */
import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0xffff00);
const points = [100, 100, 150, 50, 200, 100];
graphics.drawPolygon(points);
graphics.endFill();
graphics.position.set(100, 100);
app.stage.addChild(graphics);

document.body.appendChild(app.view as any);
