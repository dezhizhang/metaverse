/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TEventManager.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-07 06:56:27
 * :last editor: 张德志
 * :date last edited: 2023-04-09 14:23:32
 */

import {
  Camera,
  EventDispatcher,
  Object3D,
  Raycaster,
  Scene,
  Vector2,
} from 'three';

export interface TEventManagerParameters {
  dom: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;
}

export class TEventManager extends EventDispatcher {
  private raycaster: Raycaster = new Raycaster();
  private mouse: Vector2 = new Vector2();
  private dom: HTMLCanvasElement;
  private scene: Scene;
  private camera: Camera;
  constructor(params: TEventManagerParameters) {
    super();
    this.dom = params.dom;
    this.scene = params.scene;
    this.camera = params.camera;

    const mouse = this.mouse;

    const raycaster = this.raycaster;

    let cacheObject: Object3D | null = null;

    this.dom.addEventListener('mousedown', () => {
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersection = this.raycaster.intersectObjects(
        this.scene.children,
        false,
      );
      this.dispatchEvent({
        type:"mousedown",
        intersection
      })

      if (intersection.length) {
        const object = intersection[0].object;
        object.dispatchEvent({
          type:"mousedown"
        })
      }
    });


    this.dom.addEventListener('mousemove', (event) => {
      mouse.x = (event.offsetX / this.dom.offsetWidth) * 2 - 1;
      mouse.y = (-event.offsetX * 2) / this.dom.offsetHeight + 1;

      raycaster.setFromCamera(mouse, this.camera);

      const intersection = this.raycaster.intersectObjects(
        this.scene.children,
        false,
      );
      if (intersection.length) {
        const object = intersection[0].object;
        if (object !== cacheObject) {
          if (cacheObject) {
            cacheObject.dispatchEvent({
              type: 'mouseleave',
            });
          }
          object.dispatchEvent({
            type: 'mouseenter',
          });
        } else if (object === cacheObject) {
          object.dispatchEvent({
            type: 'mousemove',
          });
        }
        cacheObject = object;
      } else {
        if (cacheObject) {
          cacheObject.dispatchEvent({
            type: 'mouseleave',
          });
        }
        cacheObject = null;
      }
    });

    this.dom.addEventListener('mouseup', () => {
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersection = this.raycaster.intersectObjects(
        this.scene.children,
        false,
      );
      this.dispatchEvent({
        type:"mouseup",
        intersection
      })
      if (intersection.length) {
        const object = intersection[0].object;
        object.dispatchEvent({
          type:"mouseup"
        })
      }
    });
    this.dom.addEventListener('click', (event) => {
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersection = this.raycaster.intersectObjects(
        this.scene.children,
        false,
      );

      this.dispatchEvent({
        type:'click',
        intersection
      })

      if (intersection.length) {
        const object = intersection[0].object;
        object.dispatchEvent({
          type:"click"
        })
      }
    });
  }
}
