import URI from 'urijs';

/**
 * Converts an object of search parameters into a search string
 *
 * @param {Object} search - an object containing the search params
 *
 * @returns {String} - the search string
 */
const serializeURISearch = (search) => URI().search(search).search();


/**
 * Parses search parameters from a string
 *
 * @param {string} search - a search string
 *
 * @returns {Object} - an object containing the search params
 */
const unserializeURISearch = (search) => URI().search(search).search(true);


/*
 * Exports
 */
export {
  serializeURISearch,
  unserializeURISearch
};
