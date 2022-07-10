#webgl

```js
function init() {
    const canvas = document.getElementById('canvas');
    const webgl = canvas.getContext('webgl');
    webgl.viewport(0,0,canvas.clientWidth,canvas.clientHeight);
    webgl.clearColor(0.0,0.0,0.0,1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
}

init();
```
### 背影颜色
```js
function init() {
    const canvas = document.getElementById('canvas');
    const webgl = canvas.getContext('webgl');
    webgl.viewport(0,0,canvas.clientWidth,canvas.clientHeight);
    webgl.clearColor(106/255,121/255,162/255,1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
}

init();
```
