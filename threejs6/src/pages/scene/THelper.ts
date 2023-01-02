/*
 * :file description:
 * :name: /threejs6/src/pages/scene/THelper.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 21:59:52
 * :last editor: 张德志
 * :date last edited: 2023-01-02 22:10:11
 */
import { AxesHelper, Object3D, GridHelper, PointLightHelper } from 'three';
import { pointLight } from './TLights'
export const helperList: Object3D[] = [];

const axesHelper: AxesHelper = new AxesHelper(500);

const gridHelper: GridHelper = new GridHelper(
  500,
  10,
  'rgb(200,200,200)',
  'rgb(100,100,100)',
);

const pointLightHelper:PointLightHelper = new PointLightHelper(pointLight,pointLight.distance,pointLight.color);

helperList.push(axesHelper, gridHelper,pointLightHelper);
