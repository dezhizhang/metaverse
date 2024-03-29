/*
 * :file description:
 * :name: /threejs6/src/pages/scene/THelper.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 21:59:52
 * :last editor: 张德志
 * :date last edited: 2023-04-07 05:56:28
 */

import { AxesHelper, GridHelper, Object3D, PointLightHelper, SpotLightHelper } from "three";
import { pointLight,spotLight } from './TLights';


export const helperList:Object3D[] = [];
export const axesHelper:AxesHelper = new AxesHelper(500);

axesHelper.raycast = () => {};


export const gridHelper:GridHelper = new GridHelper(
  500,
  10,
  'rgb(200,200,200)',
  'rgb(100,100,100)'
);

gridHelper.raycast = () => {}

// 点光元辅助
const pointLighthHelper:PointLightHelper = new PointLightHelper(pointLight,pointLight.distance,pointLight.color);

const spotLightHelper:SpotLightHelper = new SpotLightHelper(spotLight)

spotLight.raycast = () => {}

helperList.push(axesHelper,gridHelper,spotLightHelper);



