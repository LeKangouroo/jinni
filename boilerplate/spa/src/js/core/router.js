import Events from 'classes/events';
import Router from 'classes/router';

const router = new Router(
  [
    { name: 'home', uri: '/home' }
  ],
  window.location
);

router.setDefaultRoute('home');
router.onRouteChange((route) => Events.emit('router:update', route));

export default router;
