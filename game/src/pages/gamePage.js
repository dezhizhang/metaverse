/*
 * :file description: 
 * :name: /metaverse-game/src/pages/gamePage.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 20:00:47
 * :last editor: 张德志
 * :date last edited: 2022-11-13 21:25:17
 */
import * as THREE from '../../js/libs/three';

class GamePage{
    constructor(callbacks) {
        this.callbacks = callbacks;
    }
    init =() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
       
       const renderer = new THREE.WebGL1Renderer({
        canvas,
       })
       let scene = new THREE.Scene();
       this.scene = scene;
       let camera = new THREE.OrthographicCamera(-this.width / 2,this.width / 2,this.height / 2,-this.height / 2,-1000,1000);

       renderer.setClearColor(new THREE.Color(0x000000));
       renderer.setSize(this.width,this.height);


       function render(h) {
            renderer.render(scene,camera)
            requestAnimationFrame(render);
       };

       render();


    }

    restart = () => {
        console.log('game page restart')
    }

}

export default GamePage;