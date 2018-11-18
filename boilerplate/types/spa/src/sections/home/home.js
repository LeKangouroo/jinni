import {
  ExampleComponent
}
from "components/components";

import events from "core/events";
import template from "./home.html";

export default {

  components: {
    ExampleComponent
  },
  data: () => ({
    name: "HomeSection"
  }),
  template,
  mounted()
  {
    console.log("home section mounted");
    events.notifyObservers("section:loaded");
  },
  destroyed()
  {
    console.log("home section destroyed");
    events.notifyObservers("section:destroyed");
  }
}
