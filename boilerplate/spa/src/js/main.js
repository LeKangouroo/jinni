import "core/polyfills";
import events from "core/events";
import homeSection from "sections/home/home";
import router from "core/router";
import SVG4Everybody from "svg4everybody";
import Vue from "vue";

console.log("main.js file loaded");

SVG4Everybody();

document.addEventListener("DOMContentLoaded", () => {

  console.log("DOMContentLoaded event callback called");

  new Vue({
    el: "#app",
    components: {
      homeSection
    },
    data: {
      currentSection: undefined,
      isLoading: true
    },
    mounted() {

      console.log("view mounted");

      events.addObserver("router:update", (route) => {

        this.currentSection = `${route.name}-section`;
      });

      events.addObserver("section:loaded", () => {

        this.isLoading = false;
        SVG4Everybody();
      });

      events.addObserver("section:destroyed", () => {

        this.isLoading = true;
      });

      router.init();
    }
  });
});
