/*
 * :file description: 
 * :name: /3dmax/examples/5向量的叉积.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-13 22:12:05
 * :last editor: 张德志
 * :date last edited: 2023-05-13 22:19:49
 */
const objA = {
    x1: 1,
    y1: 3,
    z1: 4
}

const objB = {
    x2: 2,
    y2: -5,
    z2: 8
}

function cross(objA, objB) {
    return [
        objA.y1 * objB.z2 - objA.z1 * objB.y2,
        objA.z1 * objB.x2 - objA.x1 * objB.z2,
        objA.x1 * objB.y2 - objA.y1 * objB.x2

    ]
}

const res = cross(objA, objB);
console.log({ res });
