/*
 * :file description: 
 * :name: /threejs/src/pointInPolygon.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-14 21:27:33
 * :last editor: 张德志
 * :date last edited: 2024-02-14 22:09:05
 */
// point-in-polygon库(判断点是否在多边形内)
// github地址：https://github.com/substack/point-in-polygon
function pointInPolygon(point, vs) {
  var x = point[0],
    y = point[1];
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];
    var intersect = ((yi > y) != (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};
export {pointInPolygon};