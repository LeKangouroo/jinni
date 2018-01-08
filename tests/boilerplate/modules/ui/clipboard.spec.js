const assert = require("assert");
const clipboard = require("../../../../boilerplate/_common/src/js/modules/ui/clipboard");
const JSDOM = require("jsdom").JSDOM;

const getWindow = () => (new JSDOM("<!doctype html><html><head></head><body></body></html>")).window;

const getClipboardDataMock = () => {

  const store = {};

  return {
    getData: (format) => (typeof store[format] !== "undefined" ? store[format] : ""),
    setData: (format, data) => { store[format] = data; }
  };
};

const getExecCommandMock = (window) => (cmd) => {

  const { Event, document } = window;

  if (cmd === "copy")
  {
    const e = new Event("copy");

    e.clipboardData = getClipboardDataMock();
    document.dispatchEvent(e);
  }
};

describe("Modules > UI > Clipboard", function() {

  describe("copyData()", function() {

    it("should copy some text to the clipboard", function(done) {

      const window = getWindow();

      window.document.execCommand = getExecCommandMock(window);
      clipboard.copyData(window, "foobar", { mimeType: "text/plain" }, (e) => {

        assert.strictEqual(e.clipboardData.getData("text/plain"), "foobar");
        done();
      });
    });

    it("should copy some data with text/html mime type to the clipboard", function(done) {

      const window = getWindow();

      window.document.execCommand = getExecCommandMock(window);
      clipboard.copyData(window, "hello", { mimeType: "text/html" }, (e) => {

        assert.strictEqual(e.clipboardData.getData("text/html"), "hello");
        done();
      });
    });

    it("should copy some data even without callback function", function() {

      const window = getWindow();

      window.document.execCommand = getExecCommandMock(window);
      assert.strictEqual(clipboard.copyData(window, "world"), "world");
    });
  });
});
