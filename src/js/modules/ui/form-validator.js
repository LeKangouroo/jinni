import _assign from "lodash/assign";
import Validatinator from "exports?Validatinator!validatinator";

const DEFAULT_OPTIONS = {
  rules: {},
  messages: {}
};

export class FormValidatorException extends Error
{
  constructor(message)
  {
    super(message);
    this.name = "FormValidatorException";
  }
}

export default class FormValidator
{
  constructor(form, options)
  {
    var name;

    name = form.el.getAttribute("name");
    if (!name)
    {
      throw new FormValidatorException("form must have a name attribute");
    }
    this.form = form;
    this.name = name;
    this.errors = {};
    this.options = (options) ? _assign(DEFAULT_OPTIONS, options) : DEFAULT_OPTIONS;
    this.invalidFields = [];
    this.validatinator = null;
    this.init();
  }
  init()
  {
    var params;

    params = {};
    params[this.name] = this.options.rules;
    this.validatinator = new Validatinator(params, this.options.messages);
  }
  isFieldInvalid(fieldName)
  {
    return this.invalidFields.indexOf(fieldName) > -1;
  }
  validate()
  {
    this._reset();
    if (this.validatinator.passes(this.name))
    {
      return true;
    }
    else
    {
      this.errors = this.validatinator.errors[this.name];
      this.invalidFields = Object.getOwnPropertyNames(this.errors);
      return false;
    }
  }
  _reset()
  {
    this.errors = {};
    this.invalidFields = [];
  }
}
