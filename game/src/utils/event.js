/*
 * :file description:
 * :name: /game/src/utils/event.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 20:22:58
 * :last editor: 张德志
 * :date last edited: 2023-09-24 09:54:23
 */

class Event {
  constructor(sender) {
    this._sender = sender;
    this._listeners = [];
  }

  attach(callback) {
    this._listeners.push(callback);
  }
  notify(args) {
    for (let i = 0; i < this._listeners.length; i++) {
      this._listeners[i](this._sender, args);
    }
  }
}

export default Event;
