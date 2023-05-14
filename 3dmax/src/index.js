/*
 * :file description:
 * :name: /3dmax/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-12 07:13:44
 * :last editor: 张德志
 * :date last edited: 2023-05-14 20:06:01
 */



const a11 = 1, a12 = 2, a13 = 3;
const a21 = 2, a22 = 3, a23 = 4;
const a31 = 3, a32 = 4, a33 = 5;

const b11 = 1, b12 = 2, b13 = 3;
const b21 = 2, b22 = 3, b23 = 4;
const b31 = 3, b32 = 4, b33 = 5;



const A = {
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33
    
}


const B = {
    b11,b12,b13,
    b21,b22,b23,
    b31,b32,b33
}

const AB = [A.a11 * B.b11 + A.a12 * B.b21 + A.]