import CustomException from './custom-exception';

export default class RequestException extends CustomException
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
