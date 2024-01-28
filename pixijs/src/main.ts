/*
 * :file description: 
 * :name: /pixijs/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-09 20:13:22
 * :last editor: 张德志
 * :date last edited: 2024-01-28 17:19:20
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

const rectangle = new PIXI.Graphics();
rectangle.beginFill(0x66ccff);
rectangle.drawRect(200,200,164,64);
rectangle.endFill();

app.stage.addChild(rectangle);



document.body.appendChild(app.view as any);
