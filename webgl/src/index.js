
function init() {
    const canvas = document.getElementById('canvas');
    const webgl = canvas.getContext('webgl');
    webgl.viewport(0,0,canvas.clientWidth,canvas.clientHeight);
    webgl.clearColor(0,0,0,1)
    webgl.clear(webgl.COLOR_BUFFER_BIT)
}

init();
