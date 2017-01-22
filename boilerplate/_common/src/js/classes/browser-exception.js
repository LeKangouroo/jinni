import AbstractException from './abstract-exception';

export default class BrowserException extends AbstractException
{
  constructor(message)
  {
    super(message);
  }
}
