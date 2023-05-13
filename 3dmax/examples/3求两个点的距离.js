/*
 * :file description: 
 * :name: /3dmax/examples/3求两个点的距离.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-13 21:48:07
 * :last editor: 张德志
 * :date last edited: 2023-05-13 21:48:08
 */
function distance(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    const z = a.z - b.z;

    return Math.sqrt(x * x + y * y + z * z);
}


const a = {
    x: 5,
    y: 0,
    z: 0
}

const b = {
    x: -1,
    y: 8,
    z: 0
}

const res = distance(a, b);

console.log({ res })