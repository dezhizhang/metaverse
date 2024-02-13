/*
 * :file description: 
 * :name: /threejs/src/math.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-08 22:54:34
 * :last editor: 张德志
 * :date last edited: 2024-02-12 21:25:37
 */
function lon2xyz(R,longitude,latitude) {
  var lon = longitude * Math.PI / 180;//转弧度值
  var lat = latitude * Math.PI / 180;//转弧度值
  lon = -lon;// three.js坐标系z坐标轴对应经度-90度，而不是90度
  
  // 经纬度坐标转球面坐标计算公式
  var x = R * Math.cos(lat) * Math.cos(lon);
  var y = R * Math.sin(lat);
  var z = R * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return {
    x:x,
    y:y,
    z:z,
  };
}

export { lon2xyz }