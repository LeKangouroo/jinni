import assert from "assert";
import * as form from "../../../../boilerplate/types/base/src/js/modules/ui/form.js";
import jsdom from "jsdom";

const createTestForm = () => {

  const dom = new jsdom.JSDOM(`
<!doctype html>
<html>
<head></head>
<body>
  <form>
    <div>
      <input type="radio" name="gender" value="male" checked="checked">
      <input type="radio" name="gender" value="female">
    </div>
    <div>
      <input type="checkbox" name="skills" value="cooking" checked="checked">
      <input type="checkbox" name="skills" value="flying">
      <input type="checkbox" name="skills" value="cqc" checked="checked">
    </div>
    <input type="text" name="lastname" value="doe">
    <input type="text" name="firstname" value="john">
    <input type="hidden" name="token" value="mytoken">
    <textarea name="message">Hello World</textarea>
  </form>
</body>
</html>`);

  const document = dom.window.document;

  global.HTMLFormElement = dom.window.HTMLFormElement;
  global.HTMLInputElement = dom.window.HTMLInputElement;

  return document.querySelector("form");
};

describe("Modules > UI > Form", function() {

  describe("isFormElement()", function() {

    it("should validate that it's a form element", function() {

      assert.strictEqual(form.isFormElement(createTestForm()), true);
    });

    it("should not validate that it's a form element", function() {

      assert.strictEqual(form.isFormElement({}), false);
    });
  });

  describe("isHiddenInput()", function() {

    it("should validate that it's a hidden input element", function() {

      const input = createTestForm().querySelector("input[name='token']");

      assert.strictEqual(form.isHiddenInput(input), true);
    });

    it("should not validate that it's a hidden input element", function() {

      const input = createTestForm().querySelector("input[name='lastname']");

      assert.strictEqual(form.isHiddenInput(input), false);
    });
  });

  describe("isCheckableInput()", function() {

    it("should validate that a radio input is a checkable element", function() {

      const input = createTestForm().querySelector("input[name='gender']");

      assert.strictEqual(form.isCheckableInput(input), true);
    });

    it("should validate that a checkbox input is a checkable element", function() {

      const input = createTestForm().querySelector("input[name='skills']");

      assert.strictEqual(form.isCheckableInput(input), true);
    });

    it("should not validate that it's a checkable input element", function() {

      assert.strictEqual(form.isCheckableInput([]), false);
    });
  });

  describe("getFieldNames()", function() {

    it("should return the correct list", function() {

      assert.deepStrictEqual(form.getFieldsNames(createTestForm()), ["gender", "skills", "lastname", "firstname", "token", "message"]);
    });

    it("should return the correct list without hidden inputs", function() {

      assert.deepStrictEqual(form.getFieldsNames(createTestForm(), false), ["gender", "skills", "lastname", "firstname", "message"]);
    });
  });

  describe("getFieldsElements()", function() {

    it("should return the correct list", function() {

      assert.strictEqual(form.getFieldsElements(createTestForm()).length, 9);
    });

    it("should return the correct list without hidden inputs", function() {

      assert.strictEqual(form.getFieldsElements(createTestForm(), false).length, 8);
    });
  });

  describe("getFieldsElementsMap()", function() {

    it("should return the correct list", function() {

      const f = createTestForm()
      const expectedResult = {
        gender: [].slice.call(f.querySelectorAll("*[name='gender']")),
        skills: [].slice.call(f.querySelectorAll("*[name='skills']")),
        lastname: [].slice.call(f.querySelectorAll("*[name='lastname']")),
        firstname: [].slice.call(f.querySelectorAll("*[name='firstname']")),
        token: [].slice.call(f.querySelectorAll("*[name='token']")),
        message: [].slice.call(f.querySelectorAll("*[name='message']"))
      };

      assert.deepStrictEqual(form.getFieldsElementsMap(f), expectedResult);
    });

    it("should return the correct list without hidden inputs", function() {

      const f = createTestForm()
      const expectedResult = {
        gender: [].slice.call(f.querySelectorAll("*[name='gender']")),
        skills: [].slice.call(f.querySelectorAll("*[name='skills']")),
        lastname: [].slice.call(f.querySelectorAll("*[name='lastname']")),
        firstname: [].slice.call(f.querySelectorAll("*[name='firstname']")),
        message: [].slice.call(f.querySelectorAll("*[name='message']"))
      };

      assert.deepStrictEqual(form.getFieldsElementsMap(f, false), expectedResult);
    });
  });

  describe("getData()", function() {

    it("should return the correct set of data", function() {

      assert.deepStrictEqual(form.getData(createTestForm()), {
        gender: "male",
        skills: ["cooking", "cqc"],
        lastname: "doe",
        firstname: "john",
        token: "mytoken",
        message: "Hello World"
      });
    });
  });
});
