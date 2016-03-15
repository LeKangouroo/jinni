/* globals Location: false */

import Rlite from "rlite-router";

class RouterException extends Error
{
  constructor(message)
  {
    super(message);
    this.name = "RouterException";
  }
}

export default class Router
{
  ///////////////////////////////////////////////////////////////////////
  // CONSTRUCTOR
  ///////////////////////////////////////////////////////////////////////

  constructor(routes, location)
  {
    this._validateLocation(location);
    this._validateRoutes(routes);

    this.callback = null;
    this.defaultRoute = "";
    this.location = location;
    this.rlite = null;
    this.routes = routes;
  }

  ///////////////////////////////////////////////////////////////////////
  // PUBLIC STATIC METHODS
  ///////////////////////////////////////////////////////////////////////

  static getQueryParams(queryString)
  {
    return queryString.replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this;}.bind({}))[0];
  }

  ///////////////////////////////////////////////////////////////////////
  // PUBLIC INSTANCE METHODS
  ///////////////////////////////////////////////////////////////////////

  init()
  {
    this.rlite = new Rlite();
    for (let item of this.routes)
    {
      this.rlite.add(item.uri.substr(1), (r) => {

        this.callback({
          name:   item.name,
          params: r.params,
          query:  Router.getQueryParams(this.location.search),
          uri:    item.uri
        });
      });
    }

    // Hash-based routing
    function processHash(self)
    {
      var hash;

      hash = window.location.hash || "#";
      if (!self.rlite.run(hash.slice(2)))
      {
        window.location.hash = "#" + self.defaultRoute.uri;
      }
    }
    window.addEventListener("hashchange", processHash.bind(null, this));
    processHash.call(null, this);
  }
  onRouteChange(cb)
  {
    this._validateCallback(cb);
    this.callback = cb;
  }
  setDefaultRoute(name)
  {
    for (let item of this.routes)
    {
      if (item.name === name)
      {
        this.defaultRoute = item;
        return;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////
  // PRIVATE METHODS
  ///////////////////////////////////////////////////////////////////////

  _validateCallback(callback)
  {
    if (typeof callback === "undefined")
    {
      throw new RouterException('Callback function missing');
    }
    else if (typeof callback !== "function")
    {
      throw new RouterException('Invalid callback function');
    }
  }
  _validateLocation(location)
  {
    if (typeof location.constructor === "undefined" || location.constructor !== Location)
    {
      throw new RouterException("an instance of the Location class is expected");
    }
  }
  _validateRoutes(routes)
  {
    if (routes === null || typeof routes === "undefined" || routes.constructor !== Array)
    {
      throw new RouterException('Invalid "routes" constructor argument');
    }
    for (let item of routes)
    {
      if (item === null || typeof item === "undefined" || item.constructor !== Object)
      {
        throw new RouterException("Invalid route. See console for more details");
      }
      else if (typeof item.name === "undefined" || typeof item.uri === "undefined")
      {
        throw new RouterException('"name" or "uri" field missing in the route. See console for more details');
      }
    }
  }
}