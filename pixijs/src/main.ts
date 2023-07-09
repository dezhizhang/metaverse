/*
 * :file description: 
 * :name: /pixijs/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 20:13:22
 * :last editor: 张德志
 * :date last edited: 2023-07-10 07:12:58
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
graphics.drawRect(200,200,64,64);
graphics.endFill();

app.stage.addChild(graphics);

const circle = new PIXI.Graphics();
circle.beginFill(0x66ccff,0.9);
circle.drawCircle(0,0,32);
circle.endFill();
circle.position.set(300,300);

app.stage.addChild(circle);

// 绘制圆角矩形
const roundeRectangle = new PIXI.Graphics();
roundeRectangle.beginFill(0x66ccff,0.9);
roundeRectangle.drawRoundedRect(0,0,164,64,10);
roundeRectangle.endFill();
roundeRectangle.position.set(500,500);
app.stage.addChild(roundeRectangle);

const arc = new PIXI.Graphics();




document.body.appendChild(app.view as any);
