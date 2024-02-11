import * as THREE from 'three';
import { lon2xyz } from './math.js';
import config from './config.js';

const R = config.R;

const loader = new THREE.FileLoader();
loader.setResponseType('json');
const group = new THREE.Group();
loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/airports.json',function(data) {
    const coordArr = data;
    const verticesArr = [];
    for(let i=0;i < coordArr.length;i++) {
        const lon = coordArr[i].longitude_deg;
        const lat = coordArr[i].latitude_deg;

        const coord = lon2xyz(R*1.001, lon, lat);
        verticesArr.push(coord.x,coord.y,coord.z);
    }
    const geometry = new THREE.BufferGeometry();
    const attribue = new THREE.BufferAttribute(new Float32Array(verticesArr), 3);
    geometry.attributes.position = attribue;

    const material = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 1.0, //点尺寸
    });
    const points = new THREE.Points(geometry,material);
    group.add(points);
});

export default group;


