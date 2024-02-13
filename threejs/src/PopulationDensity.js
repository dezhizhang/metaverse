
import * as THREE from 'three';
import { lon2xyz } from './math.js';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import config from './config.js';

const R = config.R;
const loader = new THREE.FileLoader();
loader.setResponseType('json');
const group = new THREE.Group();
loader.load('人口密度.json',function(data) {
    const coord =  data.population;
    const geoArr = [];
    for(let i=0;i < coord.length;i++) {
        const populationDensity = coord[i][2];//经纬度coord[i][0], coord[i][1]对应数值  人口密度
        const  height = PopulationDensity // 50;//柱子高度
        const geometry = new THREE.BoxGeometry(0.5, 0.5, height);//柱子长宽0.5 0.5 尺寸最好不要过大或过小
        const sphereCoord = lon2xyz(R, coord[i][0], coord[i][1]);//SphereCoord球面坐标
        geometry.translate(0, 0, R + height / 2);
        geometry.lookAt(new THREE.Vector3(sphereCoord.x, sphereCoord.y, sphereCoord.z));
        geoArr.push(geometry);
    }
   
    const bufferGeometry = mergeBufferGeometries(geoArr);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
    });
    const mesh = new THREE.Mesh(bufferGeometry,material);
    group.add(mesh);
});

export default group;

