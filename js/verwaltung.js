/**
 * Initialize the page. Will load all usages from the local storage and show them.
 */
 function initialize() {
  console.debug("Initializing list page")
  showUsages(loadStoredUsages());
}

/**
* Display the given usages in the usage list.
muss noch bearbeitet werden
*
* @param usages The usages to show in the usage list.
*/
//hier muss noch die rote zeile eingefügt werden
function showUsages(usages) {
 if( usages.length > 0)
    var usageFirstLine =`
    
    <div>Test</div>
    <div>${usages[0].zaehlerstand}</div>`;
    var usageLi = document.createElement("li");
    usageLi.innerHTML = usageFirstLine;
    appendById("usages", usageLi);
    
 
    if (usages) {
      for (var usage of usages) {
          var usageHtmlContent = 
          `
            
            <div class="list-usage-date">
                <img src="img/calendar.png">
                <p>${formatDate(new Date(usage.datum))}</p>
            </div>

            <div class="list-usage-counter">
                <img src="img/counter_dark.png">
                <p>${usage.zaehlerstand} kWh</p>
            </div>

            <div class ="list-usage-difference-image">
                <img src="img/energy-consumption_dark.png">
            </div>

            <div class ="list-usage-difference">
                <p class="list-usage-difference-1">Verbrauch</p>
                <p class="list-usage-difference-2">Datum</p>
            </div>

            <div class="list-usage-delete">
                <img src="img/delete.png" onclick="deleteUsage('${usage.id}')">
            </div>
          
          
          `
          
          /*`


          <div class="list-usage-checkbox">
              <img src="img/counter_dark.png" onclick="deleteUsage('${usage.id}')"/>
          </div>
          <div class="list-usage-description">
              <p class="list-usage-title">${usage.zaehlerstand}</p>
              <p class="list-usage-notes">${usage.zaehlerstand}</p>
          </div>
          <div class="list-usage-due">
              <img src="img/counter_dark.png"/>
              <p>${formatDate(new Date(usage.datum))}</p>
          </div>
          <div class="list-usage-responsible">
              <img src="img/counter_dark.png"/>
              <p>${usage.zaehlerstand}</p>
          </div>
          <div class="list-usage-edit">
              <a href="anlage.html?id=${usage.id}"><img src="img/counter_dark.png"/></a>
          </div>
      `*/;

          var usageLi = document.createElement("li");
          usageLi.innerHTML = usageHtmlContent;
          appendById("usages", usageLi);
      }
  } else {
      console.error("No usages provided to be shown")
  }
}

/**
* Safely append a new element to an element identified by its ID.
* @param id The ID of the parent element.
* @param elementToAppend The new element to append.
*/
function appendById(id, elementToAppend) {
  var element = document.getElementById(id);
  if (element) {
      element.append(elementToAppend);
  } else {
      console.error(`Element with ID not found: ${id}`);
  }
}

/**
* Delete the usage with the given ID.
*
* @param id The ID of the usage to delete.
*/
function deleteUsage(id) {
  console.debug(`Attempting to delete usage with ID: ${id}`);

  var usages = loadStoredUsages();
  if (usages && id) {
      for (var i = 0; i < usages.length; i++) {
          if (usages[i].id === id) {
              usages.splice(i, 1);
              storeUsages(usages);
              cleanUsageList();
              showUsages(usages);

              console.info(`Deleted usage with ID: ${id}`);

              break;
          }
      }
  } else {
      console.error("Invalid arguments to remove usage");
  }
}

/**
* Remove all usages from the usage list.
*/
function cleanUsageList() {

  var usageList = document.getElementById("usages");
  if (usageList) {
      usageList.innerHTML = "";
      console.debug("Cleared usage list");
  } else {
      console.error("Usage list not found");
  }
}

/**
* Properly format a date to be displayed.
*
* @param date The date to format.
* @returns {string} The formatted date.
*/
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (day < 10) {
      day = '0' + day;
  }
  if (month < 10) {
      month = '0' + month;
  }

  var formattedDate = `${day}.${month}.${year}`;
  console.debug(`Formatted date is: ${formattedDate}`);
  return formattedDate;
}
