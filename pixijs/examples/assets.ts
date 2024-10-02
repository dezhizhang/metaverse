/*
 * :file description:
 * :name: /pixijs/examples/assets.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-02 05:57:56
 * :last editor: 张德志
 * :date last edited: 2024-10-02 05:57:57
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

// 资源管理
PIXI.Assets.add("vite", "./textuer/vite.svg");

const texturePromise = PIXI.Assets.load(["vite"]);
texturePromise.then((textures) => {
  const sprite = new PIXI.Sprite(textures.vite);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;

  sprite.anchor.set(0.5);

  sprite.scale.set(1.5);
  app.stage.addChild(sprite);
});

document.body.appendChild(app.view as any);
