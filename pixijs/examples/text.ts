/*
 * :file description: 
 * :name: /pixijs/examples/text.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-02 06:19:24
 * :last editor: 张德志
 * :date last edited: 2024-10-02 06:19:39
 */

import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background:0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

const text = new PIXI.Text('hello world',{
    fontFamily:'Arial',
    fontSize:80,
    fill:0xff000,
    align:'center'
});

text.x = app.screen.width / 2 - 80;
text.y = app.screen.height / 2 - 80;

app.stage.addChild(text);

document.body.appendChild(app.view as any)
