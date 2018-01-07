const assert = require("assert");
const clipboard = require("../../../../boilerplate/_common/src/js/modules/ui/clipboard");
const JSDOM = require("jsdom").JSDOM;

const getWindow = () => (new JSDOM("<!doctype html><html><head></head><body></body></html>")).window;

describe("Modules > UI > Clipboard", function() {

  describe("copyData()", function() {

    it("should copy some text to the clipboard", function(done) {

      const window = getWindow();
      const {
        Event,
        document
      } = window;

      document.execCommand = function() {

        const e = new Event("copy");

        // TODO: mocl the clipnoardData property

        // e.clipboardData = {
          // getData: (format) => {
          //
          //   console.log("get data");
          //
          //   return data[format];
          // },
          // setData: (format, data) => {
          //
          //   console.log("set data");
          //
          //   data[format] = data;
          // }
        // };
        document.dispatchEvent(new Event("copy"));
      };
      window.document.addEventListener("copy", function(e) {
d
        assert.strictEqual(e.clipboardData.getData("text/plain"), "foofdfbar");
        done();
      });
      clipboard.copyData(window, "foobar");
    });
  });
});
