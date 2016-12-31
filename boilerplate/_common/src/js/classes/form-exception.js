import CustomException from './custom-exception';

class FormException extends CustomException
{
  constructor(message)
  {
    super(message);
  }
}

export default FormException;
