/*
 * :file description: 
 * :name: /canvas/src/utils/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 19:40:23
 * :last editor: 张德志
 * :date last edited: 2022-09-11 19:40:23
 */


export function getXY(img,x,y) {
    const w = img.width;
    const d = img.data;

    let colors = [];
    colors[0] = d[(y * w + x) * 4];
    colors[1] = d[(y * w + x) * 4 + 1];
    colors[2] = d[(y * w + x) * 4 + 2];
    colors[3] = d[(y * w + x) * 4 + 3];

    return colors;

}

export function setXY(img,x,y,colors) {
    const w = img.width;
    const d = img.data;

    d[(y * w + x) * 4] = colors[0];
    d[(y * w + x) * 4 + 1] = colors[1];
    d[(y * w + x) * 4 + 2] = colors[2];
    d[(y * w + x) * 4 + 3] = colors[3];
}


