/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/TTextures.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-03 06:26:30
 * :last editor: 张德志
 * :date last edited: 2023-04-03 06:40:09
 */

import { Texture, TextureLoader } from "three";

import images from '../../../public/1.jpeg';

const textureLoader:TextureLoader = new TextureLoader();


export const pictureTexture:Texture = textureLoader.load(images);
