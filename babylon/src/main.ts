/*
 * :file description: 
 * :name: /babylon/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-04 05:38:45
 * :last editor: 张德志
 * :date last edited: 2023-08-06 21:24:35
 */
import StereroVolumeBasePanel from './StereroVolumeBasePanel';
import './style.css'

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

new StereroVolumeBasePanel(canvas);


document.body.appendChild(canvas);
