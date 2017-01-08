import AbstractException from './abstract-exception';

export default class RouterException extends AbstractException
{
  constructor(message)
  {
    super(message);
  }
}
