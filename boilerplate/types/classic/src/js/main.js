import { getEnvironmentVariables, initDevOverlay } from "core/dev.js";

console.table(getEnvironmentVariables());
document.addEventListener("DOMContentLoaded", function() {

  console.log("DOMContentLoaded event fired");
  initDevOverlay();
});
