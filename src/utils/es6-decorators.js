/**
 * Two decorator functions to use with AngularJS and ES2015.
 *
 * Inspired by https://github.com/michaelbromley/angular-es6/blob/master/src/app/utils/register.js
 */

/**
 * Convert a constructor function into a factory function which returns a new instance of that
 * constructor, with the correct dependencies automatically injected as arguments and the
 * compile method decorated to automatically return the link method (if it exists) binded to
 * the context of the constructor.
 * 
 * @param  {function} constructorFn Constructor function
 * @return {function}               Factory function
 */
export function directive(constructorFn) {

  let originalCompileFn;

  constructorFn = _normalizeConstructor(constructorFn);

  if (!constructorFn.prototype.compile) {
    // create an empty compile function if none was defined.
    constructorFn.prototype.compile = () => {};
  }

  originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

  // Decorate the compile method to automatically return the link method (if it exists)
  // and bind it to the context of the constructor (so `this` works correctly).
  // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
  // returns `this.link` from within the compile function.
  _override(constructorFn.prototype, 'compile', () => {
    return function () {
      originalCompileFn.apply(this, arguments);

      if (constructorFn.prototype.link) {
        return constructorFn.prototype.link.bind(this);
      }
    };
  });

  return _createFactoryArray(constructorFn);
}

/**
 * Convert a constructor function into a factory function which returns a new instance of that
 * constructor, with the correct dependencies automatically injected as arguments.
 * 
 * @param  {function} constructorFn Constructor function
 * @return {function}               Factory function
 */
export function factory(constructorFn) {
  return _createFactoryArray(_normalizeConstructor(constructorFn));
}

/**
 * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
 * we need to pull out the array of dependencies and add it as an $inject property of the
 * actual constructor function.
 * @param input
 * @returns {*}
 * @private
 */
function _normalizeConstructor(input) {
  let constructorFn;

  if (input.constructor === Array) {
      //
    const injected = input.slice(0, input.length - 1);
    constructorFn = input[input.length - 1];
    constructorFn.$inject = injected;
  } else {
    constructorFn = input;
  }

  return constructorFn;
}

/**
 * Convert a constructor function into a factory function which returns a new instance of that
 * constructor, with the correct dependencies automatically injected as arguments.
 *
 * In order to inject the dependencies, they must be attached to the constructor function with the
 * `$inject` property annotation.
 *
 * @param constructorFn
 * @returns {Array.<T>}
 * @private
 */
function _createFactoryArray(constructorFn) {
  // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
  const args = constructorFn.$inject || [];
  const factoryArray = args.slice(); // create a copy of the array
  // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
  // dependency, and the final item is the factory function itself.
  factoryArray.push((...args) => {
    //return new constructorFn(...args);
    const instance = new constructorFn(...args);
    for (var key in instance) {
      instance[key] = instance[key];
    }
    return instance;
  });

  return factoryArray;
}

/**
 * Clone a function
 * 
 * @param original
 * @returns {Function}
 */
function _cloneFunction(original) {
  return function () {
    return original.apply(this, arguments);
  };
}

/**
 * Override an object's method with a new one specified by `callback`.
 * 
 * @param object
 * @param methodName
 * @param callback
 */
function _override(object, methodName, callback) {
  object[methodName] = callback(object[methodName]);
}