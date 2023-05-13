/*
 * :file description: 
 * :name: /3dmax/examples/1标准化向量.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-13 21:33:46
 * :last editor: 张德志
 * :date last edited: 2023-05-13 21:33:47
 */
const obj = {
    x:12,
    y:5,
    z:0
}

const c = Math.sqrt(obj.x * obj.x +obj.y * obj.y + obj.z * obj.z);


const mag = Object.keys(obj).map((item) => {
   return (obj[item] / c)
})
console.log(mag);

