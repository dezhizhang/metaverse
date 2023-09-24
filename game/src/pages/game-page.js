/*
 * :file description: 
 * :name: /game/src/pages/game-page.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 20:00:47
 * :last editor: 张德志
 * :date last edited: 2023-09-24 09:36:21
 */
import * as THREE from '../../libs/three';

class GamePage {
    constructor(callbacks) {
        this.callbacks = callbacks;
    }
    init() {
        console.log('GamePage init')


    }

    restart() {
        console.log('game page restart')
    }

}

export default GamePage;