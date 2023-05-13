/*
 * :file description: 
 * :name: /3dmax/examples/4向量的点积.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-13 21:58:59
 * :last editor: 张德志
 * :date last edited: 2023-05-13 22:12:26
 */
const objA = {
    x:3,
    y:-2,
    z:7
}

const objB = {
    x:0,
    y:4,
    z:-1
}


function point(objA,objB) {
    return objA.x * objB.x + objA.y * objB.y + objA.z * objB.z
}

const res = point(objA,objB);


function meg(obj) {
    return Math.sqrt(obj.x * obj.x + obj.y * obj.y + obj.z * obj.z)
}

console.log(point(objA,objB))
console.log( meg(objA));
console.log(meg(objB))


const the = Math.acos(point(objA,objB) / (meg(objA) * meg(objB))) * 180 / Math.PI

console.log({the})




