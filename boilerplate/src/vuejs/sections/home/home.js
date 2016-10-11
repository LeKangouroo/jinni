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
    el: "#main",
    template: template,
    mounted: function() {

      console.log("data", data);
      Events.emit("section:loaded");
    }
  });
}
export function destroy()
{
  view.$destroy();
  Events.emit("section:destroyed");
}
