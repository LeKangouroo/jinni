import FormException from './form-exception';

class Form
{
  constructor(element)
  {
    if (element instanceof HTMLFormElement === false)
    {
      throw new FormException("element is not an instance of HTMLFormElement");
    }
    this.el = element;
  }

  ///////////////////////////////////////////////////////////////////
  // INSTANCE METHODS
  ///////////////////////////////////////////////////////////////////

  getData()
  {
    var data,
        el,
        isCheckedInputFound,
        fields,
        name;

    data = {};
    fields = this.getFields();
    for (name in fields)
    {
      let nodeListValue = undefined;

      if (fields.hasOwnProperty(name))
      {
        el = fields[name];
        isCheckedInputFound = false;

        // NOTE: multiple elements have the same "name" attribute
        if (el instanceof NodeList)
        {
          for (let item of el)
          {
            if (!(item instanceof HTMLInputElement) || ['checkbox', 'radio'].indexOf(item.type) < 0)
            {
              throw new FormException(`unexpected NodeList item with type "${firstElement.type}"`);
            }
            if (item.checked)
            {
              if (item.type === 'radio')
              {
                nodeListValue = item.value;
                break;
              }
              if (typeof nodeListValue === 'undefined')
              {
                nodeListValue = [];
              }
              nodeListValue.push(item.value);
            }
          }
          data[name] = nodeListValue;
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
    }
    return data;
  }
  getElement()
  {
    return this.el;
  }
  getFields(hiddenFields = true, asArray = false)
  {
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
  getFieldNames(hiddenFields = true)
  {
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
        if (hiddenFields === false && Form.isHiddenInput(f))
        {
          continue;
        }
        fieldNames.push(f.name);
      }
    }
    return fieldNames;
  }
  trimValues()
  {
    var formFields;

    formFields = this.getFields(false, true);
    formFields.forEach((f) => {

      if (typeof f.value === "string")
      {
        f.value = f.value.trim();
      }
    });
  }

  ///////////////////////////////////////////////////////////////////
  // STATIC METHODS
  ///////////////////////////////////////////////////////////////////

  static isHiddenInput(field)
  {
    return (field instanceof HTMLInputElement && field.type === "hidden");
  }
}

export default Form;
