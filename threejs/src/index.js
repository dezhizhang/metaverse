/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-05-18 23:08:22
 */
import * as THREE from 'three';

import * as dat from 'stats.js';

const geometry = new THREE.BoxGeometry(10,10,10);

let area = 0.0;


console.log(geometry);

for(let i=0;i < geometry.groups.length;i++) {
    let a = geometry.groups[i].a;
    let b = geometry.groups[i].b;
    let c = geometry.groups[i].c;

    let p1 = geometry.vertices[a];
    let p2 = geometry.vertices[b];
    let p3 = geometry.vertices[c];

    area += AreaOfTriangle(p1,p2,p3);
}


function AreaOfTriangle(p1,p2,p3) {
    let v1 = new THREE.Vector3();
    let v2 = new THREE.Vector3();

    v1 = p1.clone().sub(p2);
    v2 = p1.clone().sub(p3);

    let v3 = new THREE.Vector3();

    v3.crossVectors(v1,v2);
    return v3.length() / 2;
    // let v3 = new THREE.Vector3();
    
}


console.log(area);
