/*
 * :file description:
 * :name: /game/src/game/controller.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 19:41:21
 * :last editor: 张德志
 * :date last edited: 2023-09-24 09:50:57
 */

import gameView from './view';
import gameModel from './model';

class GameController {
  constructor() {
    this.gameView = gameView;
    this.gameModel = gameModel;
  }

  showGameOverPage = () => {
    this.gameView.showGameOverPage();
  }

  restartGame =()=> {
    this.gameView.restartGame();

  }

  initPages () {
    const gamePageCallbacks = {
      showGameOverPage: this.showGameOverPage
    }
    const gameOverPageCallbacks = {
      gameRestart: this.restartGame
    }
    this.gameView.initGamePage(gamePageCallbacks)
    this.gameView.initGameOverPage(gameOverPageCallbacks)

  }
}

export default new GameController();
