/*
 * :file description:
 * :name: /pixijs/examples/sprite.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-02 05:38:43
 * :last editor: 张德志
 * :date last edited: 2024-10-02 05:51:10
 */
import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

const graphics = new PIXI.Graphics();
graphics.beginFill(0x0000ff, 0.5);
graphics.drawRect(150, 150, 100, 100);
graphics.endFill();
graphics.position.set(100, 100);
app.stage.addChild(graphics);

// 创建纹理
const texture = PIXI.Texture.from("./texture/vite.svg");
// 创建精灵
const sprite = new PIXI.Sprite(texture);
//  设置精灵位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

app.stage.addChild(sprite);

// 添加动画
app.ticker.add((delta) => {
  sprite.rotation += 0.01 * delta;
});


document.body.appendChild(app.view as any);
