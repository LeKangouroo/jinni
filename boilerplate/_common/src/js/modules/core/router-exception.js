import CustomException from './custom-exception';

export default class RouterException extends CustomException
{
  constructor(message)
  {
    super(message);
  }
}
