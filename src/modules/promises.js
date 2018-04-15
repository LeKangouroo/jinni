/**
 * Runs promises sequentially
 * @param {Promise[]} promises - a list of promises
 * @returns {Promise} - a promise
 */
const seq = (promises) => new Promise((resolve, reject) => {

  let fulfilledPromisesCount = 0;

  const results = [];

  const createFulfilledPromiseFunction = (resolve, results) => result => {

    results.push(result);
    fulfilledPromisesCount++;
    if (fulfilledPromisesCount === promises.length)
    {
      resolve(results);
    }
  };

  const handleFulfilledPromise = createFulfilledPromiseFunction(resolve, results);

  promises.forEach(p => p.then(handleFulfilledPromise).catch(reject));
});

module.exports = {
  seq
};
