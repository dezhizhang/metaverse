/*
 * :file description:
 * :name: /threejs/src/math.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-08 22:54:34
 * :last editor: 张德志
 * :date last edited: 2024-04-06 10:45:46
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

export { lon2xyz };
