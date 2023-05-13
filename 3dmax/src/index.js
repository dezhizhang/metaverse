/*
 * :file description:
 * :name: /3dmax/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-12 07:13:44
 * :last editor: 张德志
 * :date last edited: 2023-05-13 21:25:31
 */


// const x = 5;
// const y = -4;
// const z = 7;

// console.log(Math.sqrt(x * x + y * y + z * z))

const vect3 = [-5,0,0.4];

const newVect3 = vect3.map((item) => {
    return Number((-3 * item).toFixed(1))
});

console.log(newVect3);
