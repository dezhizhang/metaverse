/*
 * :file description: 
 * :name: /pixijs/src/main.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:37
 * :last editor: 张德志
 * :date last edited: 2024-10-02 07:47:36
 */
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';


const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background:0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

//  创建 Matter.js 引擎
const engine = Matter.Engine.create();
const world = engine.world;

// 创建地面
const ground = Matter.Bodies.rectangle(400, 580, 810, 60, { isStatic: true });
Matter.World.add(world,[ground]);

// 创建可移动的物体
const box = Matter.Bodies.rectangle(400, 200, 80, 80);
Matter.World.add(world,[box]);


const texture = PIXI.Texture.from("./texture/vite.svg");

const sprite = new PIXI.Sprite(texture);

sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
app.stage.addChild(sprite);





// app.ticker.add(() => {
//     Matter.Engine.update(engine); // 更新物理引擎

//     // 更新 PixiJS 中的图形位置
//     sprite.x = box.position.x;
//     sprite.y = box.position.y;
//     sprite.rotation = box.angle;
// });

// Matter.Events.on(engine, 'collisionStart', (event) => {
//   const pairs = event.pairs;
//   pairs.forEach(pair => {
//       console.log('Collision detected between', pair.bodyA, 'and', pair.bodyB);
//   });
// });


// document.body.appendChild(app.view as any);