/*
 * :file description: 
 * :name: /virtual-world/src/utils/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-15 20:07:14
 * :last editor: 张德志
 * :date last edited: 2025-02-15 20:07:15
 */


export function lon2xyz(R, longitude, latitude) {
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
  