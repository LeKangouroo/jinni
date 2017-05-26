import events from 'core/events';
import HomeSection from 'sections/home/home.jsx';
import Router from 'classes/router';

const router = new Router(
  [
    { name: 'home', uri: '/home', data: { component: HomeSection } }
  ],
  window.location
);

router.setDefaultRoute('home');
router.onRouteChange((route) => events.notifyObservers('router:update', route));

export default router;
