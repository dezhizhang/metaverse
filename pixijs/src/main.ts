/*
 * :file description: 
 * :name: /pixijs/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 20:13:22
 * :last editor: 张德志
 * :date last edited: 2024-01-28 19:44:13
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


// const text = new PIXI.Text('hello world',{
//     fontFamily:'Arial',
//     fontSize:36,
//     fill:'white',
//     align:'center'
// });

// text.position.x = app.screen.width / 2;
// text.position.y = app.screen.height / 2;


// text.anchor.set(0.5);


// app.stage.addChild(text);

// const rectangle = new PIXI.Graphics();
// rectangle.beginFill(0x66ccff);
// rectangle.drawRect(200,200,164,64);
// rectangle.endFill();

// app.stage.addChild(rectangle);

const ellipse = new PIXI.Graphics();
ellipse.beginFill(0x66ccff,0.9);
ellipse.drawEllipse(0,0,164,64);
ellipse.endFill();
ellipse.position.set(700,700);
app.stage.addChild(ellipse);

// 绘制圆孤
const arc = new PIXI.Graphics();
arc.beginFill(0x600000,0.9);
arc.arc(0,0,32,0,Math.PI,false);
arc.endFill();
arc.position.set(300,150);
app.stage.addChild(arc);

// 绘制一条线段
const line = new PIXI.Graphics();
line.lineStyle(4,0xff0000,1);
line.moveTo(0,0);
line.lineTo(100,100);
line.position.set(500,50);
app.stage.addChild(line);

// 创建一个纹理
const texture = PIXI.Texture.from('./vite.svg');

// 创建一个精灵
const sprite = new PIXI.Sprite(texture);

sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

sprite.rotation = Math.PI / 2;


app.stage.addChild(sprite);








document.body.appendChild(app.view as any);
