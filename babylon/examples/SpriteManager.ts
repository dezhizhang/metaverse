
import { ArcRotateCamera, Engine, Scene,Vector3, HemisphericLight, ActionManager,  ExecuteCodeAction, SpriteManager, Sprite } from "babylonjs";

export default class BasicScene {
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

        const camera = new ArcRotateCamera('camera', - Math.PI / 2, Math.PI /2.5,8, new Vector3(0,0,0));
        camera.attachControl(this.canvas,true);

        const light = new HemisphericLight('light',new Vector3(0,1,0),scene);


       
        const url = 'https://playground.babylonjs.com/textures/palm.png'
        const spriteManger = new SpriteManager('spriteManger',url,2000,800,scene);

        for(let i=0;i < 2000;i++) {
            const tree = new Sprite('tree' + i,spriteManger);
            tree.position.x = Math.random() * 100 - 50;
            tree.position.z = Math.random() * 100 - 50;

            if(Math.round(Math.random() * 5) == 0) {
                tree.angle = Math.PI / 2;
                tree.position.y = -0.3;
                
            }

        }

        //play
        const url1 = 'https://playground.babylonjs.com/textures/player.png';
        const spriteMangerPlayer = new SpriteManager('spriteMangerPlayer',url1,2,64,scene);

        const player1 = new Sprite('player1',spriteMangerPlayer);
        player1.playAnimation(0,40,true,100);
        player1.position.y = -0.3;
        player1.size = 0.3;
        player1.isPickable = true;

        player1.actionManager = new ActionManager();
        player1.actionManager.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickUpTrigger,
            () => {
                alert('player1 click')
            }
        ))
        
        window.addEventListener('resize',() => {
            this.engine.resize();
        })
        return scene;
        
    }
    
}