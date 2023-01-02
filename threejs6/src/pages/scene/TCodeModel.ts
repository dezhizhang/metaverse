
/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/TCodeModel.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-03 05:49:44
 * :last editor: 张德志
 * :date last edited: 2023-01-03 05:51:52
 */
import { BufferGeometry, Mesh, MeshStandardMaterial, Object3D } from 'three';


export const codeModelList:Object3D[] = [];

const geometry:BufferGeometry = new BufferGeometry();

const material:MeshStandardMaterial = new MeshStandardMaterial();

const codeBox:Mesh = new Mesh(geometry,material);

codeModelList.push(codeBox);
