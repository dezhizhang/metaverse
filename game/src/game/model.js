/*
 * :file description: 
 * :name: /game/src/game/model.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 19:41:26
 * :last editor: 张德志
 * :date last edited: 2023-09-24 10:58:26
 */
import Event from "../utils/event";

class GameModel {
    constructor() {
        this.stage = "";
        this.stateChanged = new Event(this);
    }
    getStage() {
        return this.stage;
    }
    setStage(stage) {
        this.stage = stage;
        this.stateChanged.notify({
            stage:stage
        })
    }
}

export default new GameModel();

