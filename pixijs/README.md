### pixi.js文档


### 精灵添加文理
```js
import * as PIXI from 'pixi.js';
import './style.css'


// 添加应用
const app = new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    background:0x1099bb,
    resolution:window.devicePixelRatio | 1
});


const texture = PIXI.Texture.from('./vite.svg');

const sprite = new PIXI.Sprite(texture);

sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

sprite.alpha = 0.5;

app.ticker.add((delta) => {
    sprite.rotation += 0.01 * delta;
})


app.stage.addChild(sprite);

document.body.appendChild(app.view as any);

```
