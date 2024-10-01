/*
 * :file description:
 * :name: /fabricjs/examples/basic.tsx
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-01 19:25:13
 * :last editor: 张德志
 * :date last edited: 2024-10-01 19:37:38
 */
import * as fabric from "fabric";

const canvas = new fabric.Canvas("canvas");

const rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: "red",
  width: 100,
  height: 100,
});

const circle = new fabric.Circle({
  radius: 100,
  left: 300,
  top: 100,
  fill: "pink",
});

canvas.add(rect, circle);
