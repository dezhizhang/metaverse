/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/TTextures.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-03 06:26:30
 * :last editor: 张德志
 * :date last edited: 2023-04-06 04:41:39
 */


import { Texture,TextureLoader } from 'three';
import images from '@/public/1.jpeg';

const url = 'https://tugua.oss-cn-hangzhou.aliyuncs.com/model'

const textureLoader:TextureLoader = new TextureLoader();
export const pictureTexture:Texture = textureLoader.load(images);

export const frameColorTexture:Texture = textureLoader.load(`${url}/WoodFloor024_1K_Color.jpg`);
export const frameRoughnessTexture:Texture = textureLoader.load(`${url}/WoodFloor024_1K_Roughness.jpg`);
export const frameDispTexture:Texture = textureLoader.load(`${url}/WoodFloor024_1K_Displacement.jpg`)


