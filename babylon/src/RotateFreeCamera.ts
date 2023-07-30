/*
 * :file description: 
 * :name: /babylon/src/RotateFreeCamera.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-30 11:32:58
 * :last editor: 张德志
 * :date last edited: 2023-07-30 16:03:48
 */
import { Engine, Scene, Vector3, HemisphericLight, MeshBuilder, FreeCamera, ICameraInput } from "babylonjs";
import { Nullable } from "babylonjs/index";


export default class RotateFreeCamera {
    engine: Engine;
    scene: Scene;
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas);
        this.scene = this.createScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }

    // 创建场景
    createScene(): Scene {
        const scene = new Scene(this.engine);

        const camera = new FreeCamera('camera', new Vector3(0, 3, -15));
        camera.inputs.removeByType('FreeCameraKeyboardMoveInput');
        camera.inputs.add(new FreeCameraKeyboardRotateInput());
        // camera.inputs.attached.KeyboardRotate.se
        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        const box = MeshBuilder.CreateBox('box', { size: 2 });
        box.position.y = 1;

        const ground = MeshBuilder.CreateGround('ground', { height: 6, width: 6, subdivisions: 2 });


        window.addEventListener('resize', () => {
            this.engine.resize();
        })
        return scene;

    }

}

class FreeCameraKeyboardRotateInput implements ICameraInput<FreeCamera> {
    camera: Nullable<FreeCamera>;
    getClassName(): string {
        return 'FreeCameraKeyboardRotateInput';
    }
    getSimpleName(): string {
        return 'KeyboardRotate'
    }
    attachControl(noPreventDefault?: boolean | undefined): void {
        const that = this;
        const scene = this.camera?.getScene();
        const camera = this.camera;
        scene?.onKeyboardObservable.add((kbInfo) => {
            console.log(kbInfo.event.key)
            switch (kbInfo.event.key) {
                case 'ArrowLeft':
                    camera!.cameraRotation.y += 0.01;
                    break;
                case 'ArrowRight':
                    camera!.cameraRotation.y -= 0.01;
                    break

            }
        })
    }
    detachControl(): void {
        throw new Error("Method not implemented.");
    }
    checkInputs?: (() => void) | undefined;

}