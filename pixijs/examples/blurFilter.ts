/*
 * :file description: 
 * :name: /pixijs/examples/blurFilter.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-02 06:26:20
 * :last editor: 张德志
 * :date last edited: 2024-10-02 06:26:21
 */
import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});


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



const blurFilter = new PIXI.BlurFilter();
blurFilter.blur = 2;
sprite.filters = [blurFilter];


sprite.interactive = true;
sprite.on('pointerover',() => {
    blurFilter.blur = 0;
});

sprite.on('pointerout',() => {
    blurFilter.blur = 2.0;
})


document.body.appendChild(app.view as any);