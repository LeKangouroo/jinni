import AbstractException from './abstract-exception';

export default class RequestException extends AbstractException
{
  constructor(message, xhr)
  {
    super(message);
    this.xhr = xhr;
  }
  getStatus()
  {
    return this.xhr.status;
  }
  getXHR()
  {
    return this.xhr;
  }
}
