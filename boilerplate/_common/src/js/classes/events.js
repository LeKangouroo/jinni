import EventEmitter from "wolfy87-eventemitter";

var ee = new EventEmitter();

export default class Events
{
  static emit(eventName, args)
  {
    ee.emit(eventName, args);
  }
  static off(eventName)
  {
    ee.removeEvent(eventName);
  }
  static on(eventName, callback)
  {
    ee.addListener(eventName, callback);
  }
}