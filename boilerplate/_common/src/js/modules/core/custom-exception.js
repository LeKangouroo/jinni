export default class CustomException
{
  constructor(message) {

    this.message = message;
    this.name = this.constructor.name;
    this.stack = new Error(message).stack;
  }
  getMessage() {

    return this.message;
  }
  getName() {

    return this.name;
  }
  getStack() {

    return this.stack;
  }
  toString() {

    return `${this.name}: ${this.message}`;
  }
};
