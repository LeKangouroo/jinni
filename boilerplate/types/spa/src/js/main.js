import events from "core/events";
import homeSection from "sections/home/home";
import router from "core/router";
import Vue from "vue";

console.log("environment: /*@echo ENV*/");
console.log("main.js file loaded");

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
      });

      events.addObserver("section:destroyed", () => {

        this.isLoading = true;
      });

      router.init();
    }
  });
});
