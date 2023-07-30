/*
 * :file description: 
 * :name: /babylon/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-04 05:38:45
 * :last editor: 张德志
 * :date last edited: 2023-07-30 16:40:50
 */
import GunSight from './GunSight';
import './style.css'

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

new GunSight(canvas);


document.body.appendChild(canvas);
