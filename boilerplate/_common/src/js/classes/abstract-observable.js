class AbstractObservable
{
  constructor()
  {
    this.observers = [];
  }
  addObserver(observer)
  {
    this.observers.push(observer);
  }
  notifyObservers(eventName)
  {
    this.observers.forEach((o) => o(eventName, this));
  }
  removeObserver(observer)
  {
    this.observers = this.observers.filter((o) => (o !== observer));
  }
  removeAllObservers()
  {
    this.observers = [];
  }
}

export default AbstractObservable;
