/*
 * :file description:
 * :name: /game/src/game/view.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 19:41:32
 * :last editor: 张德志
 * :date last edited: 2023-09-24 09:48:37
 */

import GamePage from '../pages/game-page';
import GameOverPage from '../pages/game-over-page';

class GameView {
  constructor() {
    this.gamePage = null;
    this.gameOverPage = null;
  }
  initGamePage(callbacks) {
    this.gamePage = new GamePage(callbacks);

    this.gamePage.init();
  }
  initGameOverPage(callbacks) {
    this.gameOverPage = new GameOverPage(callbacks);
  }


  restartGame() {
    this.gamePage.restart();
  }

  showGameOverPage = () => {
    this.gameOverPage.show();
  }
}

export default new GameView();
