/**
 * Load stored tasks from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored tasks from local storage or empty array, if no tasks were present.
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
* Store tasks in the local storage.
*
* @param usages Tasks to store.
*/
function storeUsages(usages, storageKey = "usages") {
  if (usages) {
      localStorage.setItem(storageKey, JSON.stringify(usages));
      console.debug(`Count of stored usages: ${usages.length}`);
  } else {
      console.error("No usages to store");
  }
}
