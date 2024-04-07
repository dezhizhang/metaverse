/*
 * :file description:
 * :name: /threejs/src/math.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-08 22:54:34
 * :last editor: 张德志
 * :date last edited: 2024-04-07 09:20:52
 */
function lon2xyz(R, longitude, latitude) {
  let lon = (longitude * Math.PI) / 180;
  let lat = (latitude * Math.PI) / 180;

  lon = -lon;

  const x = R * Math.cos(lat) * Math.cos(lon);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.sin(lon);

  return {
    x,
    y,
    z,
  };
}

// 经纬度转墨卡托
function lon2xy(longitude, latitude) {
  const E = longitude;
  const N = latitude;
  let x = (E * 20037508.34) / 180;
  let y = Math.log(Math.tan(((90 + N) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return {
    x: x, //墨卡托x坐标——对应经度
    y: y, //墨卡托y坐标——对应维度
  };
}

export { lon2xyz, lon2xy };
