/*
 * :file description:
 * :name: /fabricjs/src/main.tsx
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-01 17:15:29
 * :last editor: 张德志
 * :date last edited: 2024-10-01 21:09:43
 */
import * as fabric from "fabric";

// const canvas = new fabric.Canvas("canvas");

// const rect = new fabric.Rect({
//   width: 100,
//   height: 100,
//   fill: "red",
//   left: 100,
//   top: 100,
// });

// rect.set("angle", 45);
// rect.set("angle", 50);

// canvas.add(rect);

const canvas = new fabric.Canvas('canvas');

const rect = new fabric.Rect({
    width:100,
    height:100,
    fill:'red',
    left:100,
    top:100
});

rect.animate('right', 500, {
    duration: 2000,
    onChange: canvas.renderAll.bind(canvas),
    easing: fabric.util.ease.easeInOutQuad
  });

canvas.add(rect);

