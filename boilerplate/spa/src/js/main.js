import 'core/polyfills';
import router from 'core/router.js';
import events from 'modules/core/events.js';
import homeSection from 'vuejs/sections/home/home.vue';
import SVG4Everybody from 'svg4everybody';
import Vue from 'vue';

SVG4Everybody();
document.addEventListener('DOMContentLoaded', function() {

  new Vue({

    el: '#app',
    data: {
      currentSection: null,
      isLoading: true
    },
    components: {
      homeSection
    },
    mounted() {

      events.on('section:destroyed', () => {

        this.isLoading = true;
      });

      events.on('section:loaded', () => {

        this.isLoading = false;
        SVG4Everybody();
      });

      events.on('router:update', (route) => {

        this.currentSection = `${route.name}-section`;
      });

      router.init();
    }
  });
});
