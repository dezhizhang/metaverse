/*
 * :file description:
 * :name: /metaverse-game/src/main.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 16:11:31
 * :last editor: 张德志
 * :date last edited: 2022-11-13 19:43:59
 */

import * as THREE from '../js/libs/three';
import game from './game/game.js';


class Mian {
  constructor() {
  }

  static init() {
    game.init()
  }
}

export default Mian;

