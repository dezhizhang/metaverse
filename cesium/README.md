# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

### tiles3d 模型数据加载
```ts
const tileset = new Cesium.Cesium3DTileset({
    url:'/tileset.json'
});
viewer.scene.primitives.add(tileset);

tileset.readyPromise.then((title) => {å
    viewer.zoomTo(title);
})
```
### tiles3d 条件渲染
```ts
tiles3d.style = new Cesium.Cesium3DTileStyle({
    color:{
        conditions:[
          ["${feature['name']} === '广州塔'","color('yellow')"]
        ]
    }
});

```
### 鼠标事件
```ts

const tileset = new Cesium.Cesium3DTileset({
  url: '/tileset.json',
});

tileset.readyPromise.then((tile) => {
  viewer.zoomTo(tile);
});

viewer.scene.primitives.add(tileset);

   
let selectedFeature: any;

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction((movement) => {
  if (selectedFeature) {
    selectedFeature.color = Cesium.Color.WHITE;
  }

  selectedFeature = viewer.scene.pick(movement.position);
  if (!selectedFeature) return;

  selectedFeature.color = Cesium.Color.AQUA;
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```
### 加载面数据
```ts

const polygon = turf.polygon(
  [
    [
        [108,34],
            [108,34.5],
            [109,34.5],
            [109,34],
            [108,34],
          ]
        ],
        {
          name:'polygon'
        }
      );

const point:any = turf.point([109,34],{name:'point'});

const collection = turf.featureCollection([
  point,
  polygon
]);

const dataSource = Cesium.GeoJsonDataSource.load(collection);

dataSource.then((data) => {
  viewer.dataSources.add(data);
  viewer.zoomTo(data);
})
```

### 绘制圆
```ts
const center = [108.5,34.5];
const radis = 5;

const options = {steps:100,unit:'kilometers'};
const circle = turf.circle(center,radis,options);


const collection = turf.featureCollection([
  circle
]);

const dataSource = Cesium.GeoJsonDataSource.load(collection);

dataSource.then((data) => {
  viewer.dataSources.add(data);
  viewer.zoomTo(data);
})
```
### 计算包围盒
```ts
const line = turf.lineString([
  [108, 34],
  [108, 34.2],
  [108.2, 34.1],
]);

const polygon:any = turf.polygon([
  [
    [108,34],
    [108,34.2],
    [108.2,34.1],
    [108,34],

  ]
]);

const box = turf.bbox(polygon);
console.log('box',box)
    

const collection = turf.featureCollection([line,polygon]);

const datasource = Cesium.GeoJsonDataSource.load(collection,{
  stroke: Cesium.Color.BLUE,
  fill: Cesium.Color.RED,
  strokeWidth: 3,
});

datasource.then((data) => {
  viewer.dataSources.add(data);
  viewer.zoomTo(data);
})

```

### 设置tilset样式
```ts
const tilset = await new Cesium.Cesium3DTileset({
  url: '/tileset.json',
}).readyPromise;

viewer.scene.primitives.add(tilset);

viewer.zoomTo(tilset);


const styleArr = [
      {
        color:{
          conditions:[
            ["${building_name} === 'build0","color(purple)"],
            ["${building_name} === 'build1","color(red)"],
            ["${building_name} === 'build1","color(orange)"],
            ["true","color(orange)"],
          ]
        }
      }
    ];

tilset.style = new Cesium.Cesium3DTileStyle(styleArr[0]);
```

###  
```ts
  // 光照效果
    viewer.scene.globe.enableLighting = true;

    // 雾
    // viewer.scene.fog.enabled = true;
    // viewer.scene.fog.minimumBrightness = 0.1;
    // viewer.scene.fog.density = 0.03;


    // viewer.scene.globe.showGroundAtmosphere = true;
    // viewer.scene.globe.lightingFadeInDistance = 10;
    
    
    // 天空大气效果
    // viewer.scene.skyAtmosphere.show = true;
    // viewer.scene.skyAtmosphere.brightnessShift = 20;

    // HDR效果
    viewer.scene.highDynamicRange = true;

```

### 光照效果
```ts
const bloom = viewer.scene.postProcessStages.bloom;
bloom.enabled = true;
bloom.uniforms.glowOnly = false;
bloom.uniforms.contrast = 128;
bloom.uniforms.brightness = -0.3;
```
### box盒子
```ts
const box= viewer.entities.add({
  name: 'blue box',
  position: Cesium.Cartesian3.fromDegrees(0.0, 40.0, 0.0),
  box: {
    show: true,
    heightReference: Cesium.HeightReference.NONE,
    dimensions: new Cesium.Cartesian3(100, 100, 100),
    fill: true,
    material: Cesium.Color.BLUE,
    outline: true,
    outlineColor: Cesium.Color.YELLOW,
    outlineWidth: 10,
    shadows: Cesium.ShadowMode.RECEIVE_ONLY,
    },
});
```