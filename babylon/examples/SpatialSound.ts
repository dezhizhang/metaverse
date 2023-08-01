
import { ArcRotateCamera, Engine, Scene,Vector3, Sound, FreeCamera, DirectionalLight } from "babylonjs";


export default class SpatialSound {
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
        
        const camera = new FreeCamera('camera',new Vector3(0,5,0));
        camera.attachControl(this.canvas,true);

        const light = new DirectionalLight('light',new Vector3(0,-5,2),scene);
        

        const music1 = new Sound('Violons11','https://playground.babylonjs.com/sounds/violons11.wav',scene,null,{autoplay:false});

        const music2 = new Sound('Violons11','https://playground.babylonjs.com/sounds/violons18.wav',scene,null,{autoplay:false});

        const music3 = new Sound('Cellolong','https://playground.babylonjs.com/sounds/cellolong.wav',scene,null,{autoplay:false});
        
    
    
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}