import { ArcRotateCamera, Engine, Scene,Vector3, Sound } from "babylonjs";


export default class SpritePlaying {
    engine:Engine;
    scene:Scene;
    constructor(private readonly canvas:HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.createScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        }) 
    }

    // 创建场景
    createScene():Scene {
        const scene = new Scene(this.engine);

        const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5,8,new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const sounds = new Sound('Violons','https://playground.babylonjs.com/sounds/6sounds.map3',scene,null,{loop:false,autoplay:true,offset:1.0,length:9.2})

    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}