/*
 * :file description: 
 * :name: /pixijs/examples/ellipse.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-01 21:57:22
 * :last editor: 张德志
 * :date last edited: 2024-10-01 21:57:23
 */

import * as PIXI from 'pixi.js';

// 添加应用
const app = new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    background:0x1099bb,
    resolution:window.devicePixelRatio | 1
});


const ellipse = new PIXI.Graphics();
ellipse.beginFill(0x66ccff,0.9);
ellipse.drawEllipse(0,0,164,64);
ellipse.endFill();
ellipse.position.set(700,700);
app.stage.addChild(ellipse);



document.body.appendChild(app.view as any);