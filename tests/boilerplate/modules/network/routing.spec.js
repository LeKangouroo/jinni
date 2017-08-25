const assert = require("assert");
const routing = require("../../../../boilerplate/_common/src/js/modules/network/routing");

describe("Modules > Network > Routing", function() {

  describe("serializeURISearch()", function() {

    it("should return the correct string with a simple use case", function() {

      const search = { foo: "bar", toto: 4, isOK: true };
      const expectedResult = "?foo=bar&toto=4&isOK=true";

      assert.deepStrictEqual(routing.serializeURISearch(search), expectedResult);
    });

    it("should return the correct string with falsy values", function() {

      const search = { a: false, b: 0, c: null, d: undefined, e: "" };
      const expectedResult = "?a=false&b=0&c&e=";

      assert.deepStrictEqual(routing.serializeURISearch(search), expectedResult);
    });

    it("should return the correct string with nested lists", function() {

      const search = { a: [1,2,3], b: [1,2,3] };
      const expectedResult = "?a=1&a=2&a=3&b=1&b=2&b=3";

      assert.deepStrictEqual(routing.serializeURISearch(search), expectedResult);
    });
  });

  describe("unserializeURISearch()", function() {

    it("should return an object with key value pairs", function() {

      const search = "?foo=bar&toto=4&isOK=true";
      const expectedResult = { foo: "bar", toto: "4", isOK: "true" };

      assert.deepStrictEqual(routing.unserializeURISearch(search), expectedResult);
    });

    it("should return an object with nested lists", function() {

      const search = "?foo=bar&foo=baz&ids=1&ids=2&ids=3&ids=4";
      const expectedResult = { foo: ["bar", "baz"], ids: ["1", "2", "3", "4"] };

      assert.deepStrictEqual(routing.unserializeURISearch(search), expectedResult);
    });

    it("should return an empty object when an empty string is given", function() {

      const search = "";
      const expectedResult = {};

      assert.deepStrictEqual(routing.unserializeURISearch(search), expectedResult);
    });
  });
});
