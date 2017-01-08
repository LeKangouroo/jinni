class AbstractObservable
{
  constructor()
  {
    this.observers = [];
  }

  ////////////////////////////////////////////////////////////
  // INSTANCE METHODS
  ////////////////////////////////////////////////////////////

  addObserver(eventName, listener)
  {
    this.observers.push({ eventName, listener });
  }
  notifyObservers(eventName, ...args)
  {
    this.observers
    .filter((o) => (o.eventName === eventName))
    .forEach((o) => o.listener.apply(this, args));
  }
  removeObserver(eventName, listener)
  {
    this.observers = this.observers.filter((o) => (o.eventName !== eventName || o.listener !== listener));
  }
  removeObservers(eventName)
  {
    this.observers = this.observers.filter((o) => (o.eventName !== eventName));
  }
  removeObserversAll()
  {
    this.observers = [];
  }
}

export default AbstractObservable;
