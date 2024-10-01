/*
 * :file description: 
 * :name: /pixijs/examples/.bezierCurve.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-01 23:05:40
 * :last editor: 张德志
 * :date last edited: 2024-10-01 23:05:47
 */
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background:0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.lineStyle(2,0xff00ff);
graphics.moveTo(400, 200);
graphics.bezierCurveTo(450, 100, 500, 300, 600, 200);
graphics.position.set(100,100);
app.stage.addChild(graphics);

document.body.appendChild(app.view as any);
