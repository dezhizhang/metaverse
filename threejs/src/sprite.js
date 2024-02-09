import * as THREE from 'three';
import config from './config';

const R = config.R;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/aperture.png');

const spriteMaterial = new THREE.SpriteMaterial({
    map: texture, 
    transparent: true,
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(R * 3.0, R * 3.0, 1);

export default sprite;
