import { createRouter } from "modules/network/routing";
import events from "core/events";

const routes = [
  { name: "home", uri: "/home" }
];

const router = createRouter(window, routes);

router.setDefaultRoute("home");

router.onRouteChange((route) => events.notifyObservers("router:update", route));

export default router;
