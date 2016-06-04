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
}
