/*
 * :file description:
 * :name: /fabricjs/examples/path.tsx
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-01 20:05:56
 * :last editor: 张德志
 * :date last edited: 2024-10-01 20:13:22
 */

import * as fabric from "fabric";

const canvas = new fabric.Canvas("canvas");

const path = new fabric.Path("M 0 0 L 200 200 L 100 200 z");

path.set({
  left: 120,
  top: 120,
  fill: "red",
});

canvas.add(path);

