const DEVICES = [
  {
    type:        "mobile",
    orientation: "portrait",
    variant:     null,
    mediaQuery:  "(min-width: 320px)"
  },
  {
    type:        "mobile",
    orientation: "landscape",
    variant:     null,
    mediaQuery:  "(min-width: 480px) and (orientation: landscape)"
  },
  {
    type:        "tablet",
    orientation: "portrait",
    variant:     null,
    mediaQuery:  "(min-width: 768px)"
  },
  {
    type:        "tablet",
    orientation: "landscape",
    variant:     null,
    mediaQuery:  "(min-width: 1024px) and (orientation: landscape)"
  },
  {
    type:        "desktop",
    orientation: null,
    variant:     "normal",
    mediaQuery:  "(min-width: 1280px)"
  },
  {
    type:        "desktop",
    orientation: null,
    variant:     "large",
    mediaQuery:  "(min-width: 1600px)"
  }
];

export class BrowserException extends Error
{
  constructor(message)
  {
    super(message);
    this.name = "BrowserException";
  }
}

export default class Browser
{
  static getCurrentDevice()
  {
    var device,
        i;

    device = null;
    for (i = 0; i < DEVICES.length; i++)
    {
      if (window.matchMedia(DEVICES[i].mediaQuery).matches)
      {
        device = DEVICES[i];
      }
    }
    return device;
  }
  static getCurrentPosition()
  {
    return new Promise(function(resolve, reject) {
      
      if (window.navigator && window.navigator.geolocation)
      {
        window.navigator.geolocation.getCurrentPosition(
          function(position)
          {
            resolve(position);
          },
          function(err)
          {
            reject(new BrowserException("error during geolocation process"));
            console.error(err);
          }
        );
      }
      else
      {
        reject(new BrowserException("geolocation is not supported in this browser"));
      }
    });
  }
}
