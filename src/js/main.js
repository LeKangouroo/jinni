/*
 * Dependencies
 */
import "babel-polyfill";
import Events from "modules/core/events.js";
import SVG4Everybody from "svg4everybody";
import Vue from "vue";
import * as router from "core/router.js";
import * as sections from "core/sections.js";

document.addEventListener("DOMContentLoaded", function() {

  var mainView;

  SVG4Everybody();
  mainView = new Vue({

    el: "body",
    data: {
      currentSection: null,
      isLoading: true
    },
    ready: function() {

      sections.init();

      Events.on("section:destroyed", () => {

        this.isLoading = true;
      });

      Events.on("section:loaded", () => {

        this.isLoading = false;
        SVG4Everybody();
      });

      Events.on("router:update", (route) => {

        this.currentSection = route.name;
        Events.emit("section:load", route);
      });

      router.init();
    }
  });
});
