/*
 * :file description: 
 * :name: /smart-city1/src/mesh/wireframe.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 21:12:00
 * :last editor: 张德志
 * :date last edited: 2024-03-17 21:22:16
 */
import * as THREE from 'three';

export default class Wireframe {
    constructor(geometry) {
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({
            color:0xffffff,
        })
        const line = new THREE.LineSegments(edges,material);
        this.mesh = line;
        this.geometry = edges;
        
    }
}




