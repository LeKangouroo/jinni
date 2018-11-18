/**
 * Retrieves the Google Analytics object from the global namespace
 *
 * @function
 *
 * @param {Object}    options           - The initialization options
 * @param {Window}    options.window    - The window object
 *
 * @returns {Object} - the Google Analytics object
 */
export const getInstance = (options) => {

  return options.window.ga;
};


/**
 * Sends an event hit. This function is impure.
 *
 * @function
 *
 * @param {Object}  ga                  - the Google Analytics object
 * @param {Object}  options             - a set of options
 * @param {string}  options.action      - the event's action
 * @param {string}  [options.category]  - the event's category
 * @param {string}  [options.label]     - the event's label
 * @param {number}  [options.value]     - the event's value
 *
 * @returns {Object} - the Google Analytics object
 */
export const sendEvent = (ga, options) => {

  const { action, category, label, value } = options;

  ga("send", "event", category, action, label, value, { nonInteraction: true });
  return ga;
};


/**
 * Sends a page view hit. This function is impure.
 *
 * @param {Object}  ga              - the Google Analytics object
 * @param {Object}  options         - a set of options
 * @param {string}  [options.title] - the name of the page
 *
 * @returns {Object} - the Google Analytics object
 */
export const sendPageView = (ga, options) => {

  const trackerParams = {};

  if (typeof options.page === 'string')
  {
    trackerParams.page = options.page;
  }
  if (typeof options.title === 'string')
  {
    trackerParams.title = options.title;
  }
  ga("send", "pageview", trackerParams);
  return ga;
};
