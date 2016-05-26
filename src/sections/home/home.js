/*
 * Dependencies
 */
import Events from "modules/core/events.js";
import Vue from "vue";
import template from "./home.html";

var view;

export function init(data)
{
  view = new Vue({
    replace: false,
    el: "#main",
    ready: function() {

      console.log("data", data);
      Events.emit("section:loaded");
    },
    template: template
  });
}
export function destroy()
{
  view.$destroy();
  Events.emit("section:destroyed");
}
