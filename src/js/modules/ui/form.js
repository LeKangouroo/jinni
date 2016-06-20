export class FormException extends Error
{
  constructor(code, message)
  {
    super(message);
    this.code = code;
    this.name = "FormsException";
  }
}

export default class Form
{
  constructor(element) {

    if (element instanceof HTMLFormElement === false)
    {
      throw new FormException("element is not an instance of HTMLFormElement");
    }
    this.el = element;
  }
  getData() {

    var data,
        el,
        isCheckedInputFound,
        fields,
        name;

    data = {};
    fields = this.getFields();
    for (name in fields)
    {
      el = fields[name];
      isCheckedInputFound = false;
      if (el instanceof NodeList) // NOTE: multiple elements have the same "name" attribute
      {
        if (el[0] instanceof HTMLInputElement)
        {
          if (["checkbox", "radio"].indexOf(el[0].type) > -1) // NOTE: case 1 => radio and checkbox inputs
          {
            for (let item of el) // NOTE: loops through inputs to find the selected item
            {
              if (item.checked)
              {
                el = item;
                isCheckedInputFound = true;
                break;
              }
            }
          }
          data[name] = (isCheckedInputFound) ? el.value : undefined;
        }
      }
      else if (el instanceof HTMLInputElement && ["checkbox", "radio"].indexOf(el.type) > -1)
      {
        data[name] = el.checked;
      }
      else
      {
        data[name] = el.value;
      }
    }
    return data;
  }
  getFields(hiddenFields = true, asArray = false) {

    var els,
        fields,
        fieldNames,
        i,
        length,
        name;

    fields = (asArray) ? [] : {};
    fieldNames = this.getFieldNames(hiddenFields);
    length = fieldNames.length;
    for (i = 0; i < length; i++)
    {
      name = fieldNames[i];
      els = this.el.querySelectorAll(`*[name="${name}"]`);
      els = (els.length === 1) ? els[0] : els;
      if (asArray)
      {
        fields.push(els);
      }
      else
      {
        fields[name] = els;
      }
    }
    return fields;
  }
  getFieldNames(hiddenFields = true) {

    var f,
        elements,
        fieldNames,
        i,
        length;

    elements = this.el.querySelectorAll("*[name]");
    length = elements.length;
    fieldNames = [];
    for (i = 0; i < length; i++)
    {
      f = elements[i];
      if (fieldNames.indexOf(f.name) === -1)
      {
        if (hiddenFields === false && this._isHiddenInput(f))
        {
          continue;
        }
        fieldNames.push(f.name);
      }
    }
    return fieldNames;
  }
  trimValues() {

    var formFields;

    formFields = this.getFields(false, true);
    formFields.forEach((f) => {

      if (typeof f.value === "string")
      {
        f.value = f.value.trim();
      }
    });
  }
  _isHiddenInput(field) {

    return (field instanceof HTMLInputElement && field.type === "hidden");
  }
}
