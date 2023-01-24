import React from "react";
const storageKey = "letsplaybingo-janu2023";

/**
 * Checks a defined storage key in localStorage for the
 * property that is passed in and returns the value if it exists
 *
 * @param   {String}  storageKey  [storageKey description]
 * @param   {String}  property    [property description]
 *
 * @return  {Mixed}              [return description]
 */
export function checkCacheForPropertyValue(property) {
  const cachedSettings = JSON.parse(localStorage.getItem(storageKey));
  let returnValue = null;
  if (cachedSettings) {
    if (Object.keys(cachedSettings).includes(property)) {
      returnValue = cachedSettings[property];
    }
  }
  return returnValue;
}

/**
 * Retrieves the cache for the game
 *
 * @return  {Object}
 */
export function getCache() {
  const cache = localStorage.getItem(storageKey);
  return cache === null ? cache : JSON.parse(cache);
}

/**
 * Updates the cache with the parameter
 *
 * @param   {Object}  state  generally this.state
 */
export function updateCache(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

/**
 * Updates the property in a given localStorage key with the provided value
 *
 * @param   {String}  storageKey  localStorage key
 * @param   {String}  property    name of property (assumes was object)
 * @param   {Mixed}  value        value, could be any object or primitive
 */
export function updateCacheValue(property, value) {
  let cachedSettings = JSON.parse(localStorage.getItem(storageKey));
  if (cachedSettings === null) {
    cachedSettings = {};
  }
  cachedSettings[property] = value;
  localStorage.setItem(storageKey, JSON.stringify(cachedSettings));
}
