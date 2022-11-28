/**
 * Load stored tasks from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored tasks from local storage or empty array, if no tasks were present.
 */
 function loadStoredTasks(storageKey = "usage") {
  var storedUsageJson = localStorage.getItem(storageKey);
  if (storedUsageJson) {
      var usage = JSON.parse(storedUsageJson);
      console.debug(`Count of loaded tasks: ${usage.length}`);
      return usage;
  }

  return [];
}

/**
* Store tasks in the local storage.
*
* @param tasks Tasks to store.
*/
function storeUsage(usage, storageKey = "usage") {
  if (usage) {
      localStorage.setItem(storageKey, JSON.stringify(usage));
      console.debug(`Count of stored usage: ${usage.length}`);
  } else {
      console.error("No usage to store");
  }
}
