import 'core/polyfills';
import router from 'core/router';
import events from 'core/events';
import SVG4Everybody from 'svg4everybody';

SVG4Everybody();
document.addEventListener('DOMContentLoaded', function() {

  console.log('loaded');

  /*events.addObserver('section:destroyed', () => {

    this.isLoading = true;
  });

  events.addObserver('section:loaded', () => {

    this.isLoading = false;
    SVG4Everybody();
  });

  events.addObserver('router:update', (route) => {

    this.currentSection = `${route.name}-section`;
  });

  router.init();*/
});
