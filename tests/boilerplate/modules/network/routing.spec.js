const assert = require("assert");
const routing = require("../../../../boilerplate/_common/src/js/modules/network/routing");

describe("Modules > Network > Routing", function() {

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
  });
});
