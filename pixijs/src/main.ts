/*
 * :file description: 
 * :name: /pixijs/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 20:13:22
 * :last editor: 张德志
 * :date last edited: 2023-07-09 20:30:52
 */
import * as PIXI from 'pixi.js';
import './style.css'


// 添加应用
const app = new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    background:0x1099bb,
    resolution:window.devicePixelRatio | 1
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0x66ccff);
graphics.drawRect(0,0,64,64);
graphics.endFill();

app.stage.addChild(graphics);




document.body.appendChild(app.view as any);
