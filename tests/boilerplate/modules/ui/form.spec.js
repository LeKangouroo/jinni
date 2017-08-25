const assert = require("assert");
const form = require("../../../../boilerplate/_common/src/js/modules/ui/form");
const JSDOM = require("jsdom").JSDOM;
const HTMLFormElement = require("jsdom/lib/jsdom/living/generated/HTMLFormElement").interface;
const HTMLInputElement = require("jsdom/lib/jsdom/living/generated/HTMLInputElement").interface;

global.HTMLFormElement = HTMLFormElement;
global.HTMLInputElement = HTMLInputElement;

const createTestForm = () => {

  const dom = new JSDOM(`
<!doctype html>
<html>
<head></head>
<body>
  <form>
    <div>
      <input type="radio" name="gender" value="male">
      <input type="radio" name="gender" value="female">
    </div>
    <div>
      <input type="checkbox" name="skills" value="cooking">
      <input type="checkbox" name="skills" value="flying">
      <input type="checkbox" name="skills" value="cqc">
    </div>
    <input type="text" name="lastname">
    <input type="text" name="firstname">
    <input type="hidden" name="token" value="mytoken">
    <textarea name="message"></textarea>
  </form>
</body>
</html>`);

  const document = dom.window.document;

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
});
