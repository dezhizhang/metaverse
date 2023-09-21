/*
 * :file description: 
 * :name: /metaverse-game/src/game/game.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 19:40:51
 * :last editor: 张德志
 * :date last edited: 2022-11-13 21:20:45
 */

import gameController from './controller';

class Game{
    constructor() {
        this.gameController = gameController
    }

    init() {
        this.gameController.initPages();
    }
}

export default new Game();