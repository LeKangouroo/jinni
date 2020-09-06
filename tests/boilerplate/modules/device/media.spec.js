import {
  findCurrentMedia,
  getCurrentMedia,
  getMediasList
} from "../../../../boilerplate/types/base/src/js/modules/device/media.js";

import assert from "assert";
import mediaQuery from "css-mediaquery";

describe("Modules > Device > Media", () => {

  describe("getMediasList()", () => {

    it("should return the same value", () => {

      assert.deepStrictEqual(getMediasList(), [
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

  describe("findCurrentMedia()", () => {

    it("should find a mobile device in portrait orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "375px", height: "667px" })
        })
      };

      assert.deepStrictEqual(findCurrentMedia(window, getMediasList()), {
        type:        "mobile",
        orientation: "portrait",
        variant:     "",
        mediaQuery:  "(min-width: 320px)"
      });
    });

    it("should find a mobile device in landscape orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { orientation: "landscape", width: "568px", height: "320px" })
        })
      };

      assert.deepStrictEqual(findCurrentMedia(window, getMediasList()), {
        type:        "mobile",
        orientation: "landscape",
        variant:     "",
        mediaQuery:  "(min-width: 480px) and (orientation: landscape)"
      });
    });

    it("should find a tablet device in portrait orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "768px", height: "1024px" })
        })
      };

      assert.deepStrictEqual(findCurrentMedia(window, getMediasList()), {
        type:        "tablet",
        orientation: "portrait",
        variant:     "",
        mediaQuery:  "(min-width: 768px)"
      });
    });

    it("should find a tablet device in landscape orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { orientation: "landscape", width: "1024px", height: "768px" })
        })
      };

      assert.deepStrictEqual(findCurrentMedia(window, getMediasList()), {
        type:        "tablet",
        orientation: "landscape",
        variant:     "",
        mediaQuery:  "(min-width: 1024px) and (orientation: landscape)"
      });
    });

    it("should find a desktop device in normal variant", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "1440px", height: "900px" })
        })
      };

      assert.deepStrictEqual(findCurrentMedia(window, getMediasList()), {
        type:        "desktop",
        orientation: "",
        variant:     "normal",
        mediaQuery:  "(min-width: 1280px)"
      });
    });

    it("should find a desktop device in large variant", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "1920px", height: "1080px" })
        })
      };

      assert.deepStrictEqual(findCurrentMedia(window, getMediasList()), {
        type:        "desktop",
        orientation: "",
        variant:     "large",
        mediaQuery:  "(min-width: 1600px)"
      });
    });
  });

  describe("getCurrentMedia()", () => {

    it("should find a mobile device in portrait orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "375px", height: "667px" })
        })
      };

      assert.deepStrictEqual(getCurrentMedia(window), {
        type:        "mobile",
        orientation: "portrait",
        variant:     "",
        mediaQuery:  "(min-width: 320px)"
      });
    });

    it("should find a mobile device in landscape orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { orientation: "landscape", width: "568px", height: "320px" })
        })
      };

      assert.deepStrictEqual(getCurrentMedia(window), {
        type:        "mobile",
        orientation: "landscape",
        variant:     "",
        mediaQuery:  "(min-width: 480px) and (orientation: landscape)"
      });
    });

    it("should find a tablet device in portrait orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "768px", height: "1024px" })
        })
      };

      assert.deepStrictEqual(getCurrentMedia(window), {
        type:        "tablet",
        orientation: "portrait",
        variant:     "",
        mediaQuery:  "(min-width: 768px)"
      });
    });

    it("should find a tablet device in landscape orientation", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { orientation: "landscape", width: "1024px", height: "768px" })
        })
      };

      assert.deepStrictEqual(getCurrentMedia(window), {
        type:        "tablet",
        orientation: "landscape",
        variant:     "",
        mediaQuery:  "(min-width: 1024px) and (orientation: landscape)"
      });
    });

    it("should find a desktop device in normal variant", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "1440px", height: "900px" })
        })
      };

      assert.deepStrictEqual(getCurrentMedia(window), {
        type:        "desktop",
        orientation: "",
        variant:     "normal",
        mediaQuery:  "(min-width: 1280px)"
      });
    });

    it("should find a desktop device in large variant", () => {

      const window = {
        matchMedia: (mq) => ({
          matches: mediaQuery.match(mq, { width: "1920px", height: "1080px" })
        })
      };

      assert.deepStrictEqual(getCurrentMedia(window), {
        type:        "desktop",
        orientation: "",
        variant:     "large",
        mediaQuery:  "(min-width: 1600px)"
      });
    });
  });
});
