const assert = require('assert');
const media = require('../../../../boilerplate/_common/src/js/modules/device/media');

describe("Modules > Device > Media", function() {

  describe("#getMediasList method", function() {

    it("should return the same value", function() {

      assert.deepStrictEqual(media.getMediasList(), [
        {
          type:        "desktop",
          orientation: "",
          variant:     "large",
          mediaQuery:  "(min-width: 1600px)"
        },
        {
          type:        "desktop",
          orientation: "",
          variant:     "normal",
          mediaQuery:  "(min-width: 1280px)"
        },
        {
          type:        "tablet",
          orientation: "landscape",
          variant:     "",
          mediaQuery:  "(min-width: 1024px) and (orientation: landscape)"
        },
        {
          type:        "tablet",
          orientation: "portrait",
          variant:     "",
          mediaQuery:  "(min-width: 768px)"
        },
        {
          type:        "mobile",
          orientation: "landscape",
          variant:     "",
          mediaQuery:  "(min-width: 480px) and (orientation: landscape)"
        },
        {
          type:        "mobile",
          orientation: "portrait",
          variant:     "",
          mediaQuery:  "(min-width: 320px)"
        }
      ]);
    });
  });
});
