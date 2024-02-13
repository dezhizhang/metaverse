/*
 * :file description: 
 * :name: /threejs/src/points.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-09 11:31:01
 * :last editor: 张德志
 * :date last edited: 2024-02-12 21:24:24
 */
import * as THREE from 'three';
import { lon2xyz } from './math.js'
import config from './config.js'


const R = config.R;
const loader = new THREE.FileLoader();
loader.setResponseType('json');
const group = new THREE.Group();
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/airports.json',function(data) {
    const coordArr = data.points;
    const verticesArr = [];
    for(let i=0;i < coordArr && coordArr.length;i+=2) {
        const coord = lon2xyz(R * 1.001, coordArr[i], coordArr[i + 1]);
        verticesArr.push(coord.x,coord.y,coord.z);
    }
    const geometry = new THREE.BufferGeometry();
    const attribue = new THREE.BufferAttribute(new Float32Array(verticesArr),3);
    geometry.attributes.position = attribue;
    const material = new THREE.PointsMaterial({
        color: 0x22ffee,
        size: 1
    });
    const points = new THREE.Points(geometry,material);
    group.add(points);
});

export default group;



