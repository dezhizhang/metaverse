/*
 * :file description:
 * :name: /metaverse-game/src/game/view.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 19:41:32
 * :last editor: 张德志
 * :date last edited: 2022-11-13 21:27:20
 */

import GamePage from '../pages/gamePage';
import GameOver from '../pages/gameOverPage';

class GameView {
  constructor() {
    this.gamePage = null;
    this.gameOverPage = null;
  }
  initGamePage =(callbacks)=> {
    this.gamePage = new GamePage(callbacks);
   
    this.gamePage.init();
  }

  initGameOverPage = (callbacks) => {
    this.gameOverPage = new GameOver(callbacks);
    this.gameOverPage.init({
      scene:this.gamePage.scene
    });

  }

  restartGame = () => {
    this.gamePage.restart();
  }

  showGameOverPage = () => {
    this.gameOverPage.show();
  }
}

export default new GameView();
