import CustomException from './custom-exception';

export default class BrowserException extends CustomException
{
  constructor(message)
  {
    super(message);
  }
}
