/**
 * Initialize the page. Will provide a form to create a new task, if no ID is provided as query parameter. If
 * an ID is provided as query parameter, an edit form will be shown.
 */
 function initialize() {
  console.debug("Initializing create and edit page")

  var usageId = new URLSearchParams(location.search).get("id");
  if (usageId) {
      console.debug(`Page loaded in edit mode for usage with ID: ${usageId}`);
      var usage = getUsageById(loadStoredUsages(), usageId);
      if (usage) {
          setValueById("datum", usage.datum);
          setValueById("zaehlerstand", usage.zaehlerstand);
          

          setTextContentById("save-btn", "Speichern");
          setAttributeById("save-btn", "onclick", `save('${usageId}')`);
      } else {
          console.error("Usage not found for ID: " + usageId);
      }
  } else {
      console.debug("Page loaded in create mode");
  }
}

/**
* Safely set the value of an element identified by its ID.
*
* @param id The ID of the element to search for.
* @param value The value to set.
*/
function setValueById(id, value) {
  var element = document.getElementById(id);
  if (element) {
      element.value = value;
  } else {
      console.error(`Element with ID does not exist: ${id}`);
  }
}

/**
* Safely set the text content of an element identified by its ID.
*
* @param id The ID of the element to search for.
* @param value The text content to set.
*/
function setTextContentById(id, value) {
  var element = document.getElementById(id);
  if (element) {
      element.textContent = value;
  } else {
      console.error(`Element with ID does not exist: ${id}`);
  }
}

/**
* Safely set an attribute value of an element identified by its ID.
*
* @param id The ID of the element to search for.
* @param attributeName The name of the attribute to set.
* @param attributeValue The value of the attribute to set.
*/
function setAttributeById(id, attributeName, attributeValue) {
  var element = document.getElementById(id);
  if (element) {
      element.setAttribute(attributeName, attributeValue);
  } else {
      console.error(`Element with ID does not exist: ${id}`);
  }
}

/**
* Searches for a task contained in the local storage.
*
* @param usages The list of tasks to search in.
* @param id The ID of the task to search for.
* @returns {any|undefined} The task, if it was found.
*/
function getUsageById(usages, id) {
  for (var usage of usages) {
      if (usage.id === id) {
          return usage;
      }
  }
  return undefined;
}

/**
* Save the data contained in the form.
*
* @param id The ID of the task, if a task should be updated.
*/
function save(id) {
  var usages = loadStoredUsages();
  var usage = createUsageFromInput(id);

  if (id) {
      replaceUsage(usages, id, usage);
  } else {
      usages.push(createUsageFromInput());
  }
  storeUsages(usages);
  console.debug("Usage saved");
}

/**
* Replace a task with a specific ID in a task array.
*
* @param usages The array in which the task should be replaced.
* @param idToReplace The ID of the task to replace.
* @param updatedUsage The task object replacing the task with the given ID.
*/
function replaceUsage(usages, idToReplace, updatedUsage) {
  if (usages && idToReplace && updatedUsage) {
      for (var i = 0; i < usages.length; i++) {
          if (usages[i].id === idToReplace) {
              usages[i] = updatedUsage
              return;
          }
      }
  } else {
      console.error("Invalid arguments to replace usage");
  }
  console.error(`Element with ID not known: ${idToReplace}`);
}

/**
* Create a task object from the values of the form input fields related to a task.
*
* @param id An existing ID, if it is known. If not provided, a new ID will be generated.
* @returns {{notes: (*|undefined), due: (*|undefined), responsible: (*|undefined), id: string, title: (*|undefined)}} Task object.
*/
function createUsageFromInput(id) {
  var datum = getInputValueById("datum");
  var notes = getInputValueById("zaehlerstand");


  // If no ID is provided, we create one
  if (!id) {
      id = crypto.randomUUID();
  }

  return {
      id: id,
      datum: datum,
      zaehlerstand: zaehlerstand,
      
  }
}

/**
* Search for an HTML input element by its ID and return the value.
*
* @param id The ID of the HTML input element.
* @returns {undefined|*} The value of the HTML input element, if one with the given ID exists.
*/
function getInputValueById(id) {
  if (id) {
      var input = document.getElementById(id);
      if (input) {
          return input.value;
      } else {
          console.error(`Input with ID not found: ${id}`);
          return undefined;
      }
  }

  console.error("No ID provided");
  return undefined;
}
