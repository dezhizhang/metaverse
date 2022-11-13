/*
 * :file description:
 * :name: /metaverse-game/src/utils/event.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 20:22:58
 * :last editor: 张德志
 * :date last edited: 2022-11-13 20:25:16
 */

class Event {
  constructor(sender) {
    this.sender = sender;
    this.listeners = [];
  }

  attach(callback) {
    this.listeners.push(callback);
  }
  notify(args) {
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i](this.sender, args);
    }
  }
}

export default Event;
