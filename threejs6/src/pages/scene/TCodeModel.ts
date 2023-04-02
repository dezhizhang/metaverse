
/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/TCodeModel.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-03 05:49:44
 * :last editor: 张德志
 * :date last edited: 2023-04-03 07:10:37
 */
import { BufferAttribute, BufferGeometry, Mesh, MeshStandardMaterial, Object3D } from 'three';

const size:number = 10;

export const codeModelList:Object3D[] = [];

const points:Float32List = new Float32Array( [
    -size,size,size,
    size,size,size,
    size,size,-size,
    -size,size,-size,

    -size,-size,size,
    size,-size,size,
    size,-size,-size,
    -size,-size,-size,

]);

const index:number[] = [
    0,1,2,
    2,3,0,

    0,4,5,
    5,1,0,

    1,5,6,
    6,2,1,

    2,6,7,
    7,3,2,

    0,7,4,
    0,3,7,

    4,6,5,
    7,6,4
]

const geometry:BufferGeometry = new BufferGeometry();
geometry.setAttribute('position',new BufferAttribute(points,3));
geometry.setAttribute('normal',new BufferAttribute(points,3));
geometry.setIndex(index);

const material:MeshStandardMaterial = new MeshStandardMaterial({
    color:'rgb(255,0,0)'
});

const codeBox:Mesh = new Mesh(geometry,material);
codeBox.position.y = 10;


codeModelList.push(codeBox);
