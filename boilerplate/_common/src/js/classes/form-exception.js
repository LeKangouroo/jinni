import AbstractException from './abstract-exception';

class FormException extends AbstractException
{
  constructor(message)
  {
    super(message);
  }
}

export default FormException;
