import Events from 'modules/core/events.js';
import Router from 'modules/core/router.js';

const router = new Router(
  [
    { name: 'home', uri: '/home' }
  ],
  window.location
);

router.setDefaultRoute('home');
router.onRouteChange((route) => Events.emit('router:update', route));

export default router;
