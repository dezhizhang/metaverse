import * as THREE from 'three';

// const a = new THREE.Vector3( 0, 1, 0 );

// //no arguments; will be initialised to (0, 0, 0)
// const b = new THREE.Vector3( );

// const d = a.distanceTo( b );

// console.log(d)

// const a = new THREE.Vector3(1,1,1);

// const b = new THREE.Vector3();

// const d = a.distanceTo(b);

// console.log(d)

// const geometry = new THREE.SphereGeometry(50,25,25);
// console.log(geometry)


const p1 = new THREE.Vector3(10,8,12);
const p2 = new THREE.Vector3(30,30,-10);

const l = p1.clone().sub(p2).length();

console.log('两点间的距离',l);
