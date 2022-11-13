/*
 * :file description: 
 * :name: /metaverse-game/src/pages/gamePage.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 20:00:47
 * :last editor: 张德志
 * :date last edited: 2022-11-13 20:21:07
 */


class GamePage{
    constructor(callbacks) {
        this.callbacks = callbacks;
    }
    init() {
        console.log('init gamepage')
    }

    restart = () => {
        console.log('game page restart')
    }

}

export default GamePage;