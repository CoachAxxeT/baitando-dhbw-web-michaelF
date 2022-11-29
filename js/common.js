/**
 * Load stored usages from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored usages from local storage or empty array, if no usages were present.
 */
 function loadStoredUsages(storageKey = "usages") {

  var storedUsagesJson = localStorage.getItem(storageKey);
  if (storedUsagesJson) {
      var usages = JSON.parse(storedUsagesJson);
      var sortedUsages = bblsortUsages(usages);
      console.debug(`Count of loaded usages: ${sortedUsages.length}`);
      return sortedUsages;
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

function bblsortUsages(usages){
    
  for(var i = 0; i < usages.length; i++){
     
    // Last i elements are already in place 
    for(var j = 0; j < ( usages.length - i -1 ); j++){
       
      // Checking if the item at present iteration
      // is greater than the next iteration
      if(usages[j].datum < usages[j+1].datum){
         
        // If the condition is true then swap them
        var temp = usages[j]
        usages[j] = usages[j + 1]
        usages[j+1] = temp
      }
    }
  }
  // Print the sorted array
  return usages;
 }
