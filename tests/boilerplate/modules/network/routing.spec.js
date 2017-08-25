const assert = require("assert");
const routing = require("../../../../boilerplate/_common/src/js/modules/network/routing");

describe("Modules > Network > Routing", function() {

  describe("serializeURISearch()", function() {

    it("should return the correct string with a simple use case", function() {

      const search = { foo: "bar", toto: 4, isOK: true };
      const expectedResult = "?foo=bar&toto=4&isOK=true";

      assert.strictEqual(routing.serializeURISearch(search), expectedResult);
    });

    it("should return the correct string with falsy values", function() {

      const search = { a: false, b: 0, c: null, d: undefined, e: "" };
      const expectedResult = "?a=false&b=0&c&e=";

      assert.strictEqual(routing.serializeURISearch(search), expectedResult);
    });

    it("should return the correct string with nested lists", function() {

      const search = { a: [1,2,3], b: [1,2,3] };
      const expectedResult = "?a=1&a=2&a=3&b=1&b=2&b=3";

      assert.strictEqual(routing.serializeURISearch(search), expectedResult);
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

  describe("createRouter()", function() {

    it("should return a new router which matches the correct route", function() {

      const window = {

        location: {
          search: "",
          hash: "#/test"
        },
        addEventListener(event, cb) {}
      };

      const routes = [
        { name: "test", uri: "/test" }
      ];

      const router = routing.createRouter(window, routes);

      router.onRouteChange((route) => {

        assert.strictEqual(route.name, "test");
      });
      router.init();
    });

    it("should return a new router which fallbacks to the default route when the route is invalid", function() {

      const window = {

        location: {
          search: "",
          hash: "#/foobar"
        },
        addEventListener(event, cb) {}
      };

      const routes = [
        { name: "default", uri: "/default" }
      ];

      const router = routing.createRouter(window, routes);

      router.setDefaultRoute("default");
      router.onRouteChange((route) => {

        assert.strictEqual(route.name, "default");
      });
      router.init();
    });

    it("should return a new router which matches a route with names parameters", function() {

      const window = {

        location: {
          search: "",
          hash: "#/users/5"
        },
        addEventListener(event, cb) {}
      };

      const routes = [
        { name: "user", uri: "/users/:id" }
      ];

      const router = routing.createRouter(window, routes);

      router.onRouteChange((route) => {

        assert.strictEqual(route.params.id, "5");
      });
      router.init();
    });

    it("should return a new router which matches a route associated with search params", function() {

      const window = {

        location: {
          search: "?id=42",
          hash: "#/users"
        },
        addEventListener(event, cb) {}
      };

      const routes = [
        { name: "users", uri: "/users" }
      ];

      const router = routing.createRouter(window, routes);

      router.onRouteChange((route) => {

        assert.strictEqual(route.search.id, "42");
      });
      router.init();
    });

    it("should return a new router which handles route change programmatically", function(done) {

      const window = {

        cb: null,
        location: {
          search: "",
          _hash: "#/users",
          get hash() {

            return this._hash;
          },
          set hash(str) {

            this._hash = str;
            window.cb();
          }
        },
        addEventListener(event, cb) {

          if (event === "hashchange")
          {
            this.cb = cb;
          }
        }
      };

      const routes = [
        { name: "users", uri: "/users" },
        { name: "posts", uri: "/posts" }
      ];

      const router = routing.createRouter(window, routes);

      var counter = 0;

      router.onRouteChange((route) => {

        counter++;
        if (counter === 2)
        {
          assert.strictEqual(route.name, "posts");
          done();
        }
        else
        {
          router.changeRoute("/posts");
        }
      });
      router.init();
    });
  });
});
