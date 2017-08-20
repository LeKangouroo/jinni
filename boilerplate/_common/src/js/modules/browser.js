import Jump from 'jump.js';


/**
 * Returns informations about the current media
 *
 * @function
 *
 * @param {Object}  window                - The Window object of the browser
 * @param {Array}   medias                - A list of medias
 * @param {string}  medias[].type         - The type (ex : mobile, tablet, desktop)
 * @param {string}  medias[].orientation  - The orientation (ex : portrait, landscape)
 * @param {string}  medias[].variant      - The variant (ex : normal, large)
 * @param {string}  medias[].mediaQuery   - The media query
 *
 * @returns {(Object|undefined)} - An item of the list or undefined if no result found.
 */
const findCurrentMedia = (window, medias) => medias.find(d => window.matchMedia(d.mediaQuery).matches);


/**
 * Returns a promise which resolves with an instance of the Position interface
 *
 * @function
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Position}
 *
 * @param {Object} window - The Window object of the browser
 *
 * @returns {Promise} - The promise
 */
const getGeolocation = (window) => new Promise((resolve, reject) => {

  if (window.navigator && window.navigator.geolocation)
  {
    window.navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(new Error(`error during geolocation process: ${err.message}`)));
  }
  else
  {
    reject(new Error("geolocation is not supported in this browser"));
  }
});


/**
 * Returns the list of expected medias
 *
 * @function
 *
 * @returns {Array} - a list of medias
 */
const getMediasList = () => ([
  {
    type:        "desktop",
    orientation: "",
    variant:     "large",
    mediaQuery:  "(min-width: 1600px)"
  },
  {
    type:        "desktop",
    orientation: "",
    variant:     "normal",
    mediaQuery:  "(min-width: 1280px)"
  },
  {
    type:        "tablet",
    orientation: "landscape",
    variant:     "",
    mediaQuery:  "(min-width: 1024px) and (orientation: landscape)"
  },
  {
    type:        "tablet",
    orientation: "portrait",
    variant:     "",
    mediaQuery:  "(min-width: 768px)"
  },
  {
    type:        "mobile",
    orientation: "landscape",
    variant:     "",
    mediaQuery:  "(min-width: 480px) and (orientation: landscape)"
  },
  {
    type:        "mobile",
    orientation: "portrait",
    variant:     "",
    mediaQuery:  "(min-width: 320px)"
  }
]);


/**
 * Scrolls the browser viewport to an element. This function is impure.
 *
 * @function
 *
 * @param {Element}   element         - an element of the DOM
 * @param {Number}    [duration=1000] - the duration of the animation in milliseconds
 * @param {?Function} callback        - the callback function called when the scrolling animation ends
 */
const scrollToElement = ({ element, duration = 1000, callback = undefined }) => Jump(element, { callback, duration });


/*
 * Exports
 */
export {
  findCurrentMedia,
  getGeolocation,
  getMediasList,
  scrollToElement
};
