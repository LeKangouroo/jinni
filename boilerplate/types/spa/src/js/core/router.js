import events from "core/events.js";

import { createRouter } from "modules/network/routing.js";
import { getEnvironmentVariables } from "core/dev.js";

const getTitle = (sectionName, env) => env === "production"
  ? `${sectionName} - ${window.location.hostname}`
  : `[${env}] ${sectionName} - ${window.location.hostname}`;

const routes = [
  {
    name: "home",
    uri: "/home",
    data: {
      title: getTitle("Accueil", getEnvironmentVariables().environment)
    }
  }
];

const router = createRouter(window, routes);

router.setDefaultRoute("home");
router.onRouteChange(route => {

  document.title = route.data.title;
  events.notifyObservers("router:update", route);
});

export default router;
