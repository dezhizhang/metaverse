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