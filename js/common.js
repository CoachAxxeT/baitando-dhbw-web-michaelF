/**
 * Load stored usages from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored usages from local storage or empty array, if no usages were present.
 */
 function loadStoredUsages(storageKey = "usages") {

  var storedUsagesJson = localStorage.getItem(storageKey);
  if (storedUsagesJson) {
      var usages = JSON.parse(storedUsagesJson);
      console.debug(`Count of loaded usages: ${usages.length}`);
      return usages;
  }

  return [];
}

/**
* Store usages in the local storage.
*
* @param usages Usages to store.
*/
function storeUsages(usages, storageKey = "usages") {
  if (usages) {
      localStorage.setItem(storageKey, JSON.stringify(usages));
      console.debug(`Count of stored usages: ${usages.length}`);
  } else {
      console.error("No usages to store");
  }
}


