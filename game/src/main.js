/*
 * :file description:
 * :name: /game/src/main.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 16:11:31
 * :last editor: 张德志
 * :date last edited: 2023-09-23 20:12:10
 */
import * as THREE from '../libs/three'
import game from './game/game.js';

window.THREE = THREE;



class Mian {
  constructor() {
  }

  static init() {
    game.init()
  }
}

export default Mian;

