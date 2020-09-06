import events from "core/events";
import homeSection from "sections/home/home";
import router from "core/router";
import Vue from "vue";

import { getEnvironmentVariables, initDevOverlay } from "core/dev.js";

console.table(getEnvironmentVariables());
document.addEventListener("DOMContentLoaded", () => {

  console.log("DOMContentLoaded event fired");
  initDevOverlay();

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
      });

      events.addObserver("section:destroyed", () => {

        this.isLoading = true;
      });

      router.init();
    }
  });
});
