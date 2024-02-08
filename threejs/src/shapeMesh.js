import * as THREE from 'three';

function shapeMesh(pointsArrs) {
  const shapeArr = [];
  pointsArrs.forEach((pointsArr) => {
    const vector2Arr = [];
    pointsArr[0].forEach((elem) => {
      vector2Arr.push(new THREE.Vector2(elem[0], elem[1]));
    });

    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  const material = new THREE.MeshBasicMaterial({
    color: 0x004444,
    side: THREE.DoubleSide, //两面可见
  });
  const geometry = new THREE.ShapeGeometry(shapeArr);
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

export { shapeMesh };
