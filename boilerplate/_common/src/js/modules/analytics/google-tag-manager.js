/**
 * Retrieves the Google Tag Manager object from the global namespace
 *
 * @function
 *
 * @param {Object}    options           - The initialization options
 * @param {Window}    options.window    - The window object
 *
 * @returns {Object} the Google Tag Manager object
 */
export const getInstance = (options) => {

  return options.window.gtag;
};


/**
 * Sends an event hit. This function is impure.
 *
 * @function
 *
 * @param {Object}  gtag                - the Google Tag Manager object
 * @param {Object}  options             - a set of options
 * @param {string}  options.action      - the event's action
 * @param {string}  [options.category]  - the event's category
 * @param {string}  [options.label]     - the event's label
 * @param {number}  [options.value]     - the event's value
 *
 * @returns {Object} the Google Tag Manager object
 */
export const sendEvent = (gtag, options) => {

  const { action, category, label, value } = options;
  const trackerParams = { non_interaction: true };

  if (typeof category === "string")
  {
    trackerParams.event_category = category;
  }
  if (typeof label === "string")
  {
    trackerParams.event_label = label;
  }
  if (typeof value === "string")
  {
    trackerParams.value = value;
  }
  gtag("event", action, trackerParams);
  return gtag;
};


/**
 * Sends a page view hit. This function is impure.
 *
 * @param {Object}  gtag            - the Google Tag Manager object
 * @param {Object}  options         - a set of options
 * @param {string}  [options.title] - the name of the page
 *
 * @returns {Object} the Google Tag Manager object
 */
export const sendPageView = (gtag, options) => {

  const trackerParams = {};
  const { title, trackingId } = options;

  if (typeof title === 'string')
  {
    trackerParams.page_title = title;
  }
  gtag("config", trackingId, trackerParams);
  return gtag;
};
