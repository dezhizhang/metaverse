/*
 * :file description: 
 * :name: /3dmax/examples/2向量的加法.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-13 21:38:46
 * :last editor: 张德志
 * :date last edited: 2023-05-13 21:38:47
 */
const objA = {
    x:1,
    y:2,
    z:3
}

const objB = {
    x:4,
    y:5,
    z:6
}

const AB = [objA.x + objB.x,objA.y + objB.y,objA.z + objB.z];

console.log(AB);

