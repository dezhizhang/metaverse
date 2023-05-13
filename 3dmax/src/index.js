/*
 * :file description:
 * :name: /3dmax/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-12 07:13:44
 * :last editor: 张德志
 * :date last edited: 2023-05-13 21:37:31
 */


// const x = 5;
// const y = -4;
// const z = 7;

// console.log(Math.sqrt(x * x + y * y + z * z))

// const vect3 = [-5,0,0.4];

// const newVect3 = vect3.map((item) => {
//     return Number((-3 * item).toFixed(1))
// });

// console.log(newVect3);


// const obj = {
//     x:12,
//     y:5,
//     z:0
// }

// const c = Math.sqrt(obj.x * obj.x +obj.y * obj.y + obj.z * obj.z);


// const mag = Object.keys(obj).map((item) => {
//    return (obj[item] / c)
// })
// console.log(mag);


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



