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
 if(usages){
    var usageFirstLine =`
    <div class="list-usage-date">
      
    </div>

    <div class="list-usage-counter-firstline">
      <img src="img/counter_light.png">
      <p>${usages[0].zaehlerstand} kWh</p>
    </div>

    <div class ="list-usage-difference-image-firstline">
        <img src="img/energy-consumption_light.png">
    </div>

    <div class ="list-usage-difference-firstline">
        <p class="list-usage-difference-1-firstline">${(usages[0].zaehlerstand - usages[usages.length-1].zaehlerstand).toFixed(2)} kWh</p>
        <p class="list-usage-difference-2-firstline">${formatDate(new Date(usages[usages.length-1].datum))} - ${formatDate(new Date(usages[0].datum))}</p>
    </div>

    <div class="list-usage-delete">
        
    </div>

    `;
    var usageLi = document.createElement("li");
    usageLi.innerHTML = usageFirstLine;
    appendById("usages", usageLi);
 }
    var counter = 1;
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
                ${consumptionImage(counter,usages)}
            </div>
            
            <div class ="list-usage-difference">
                
                <p class="list-usage-difference-1">${consumptionSinceLastTime(usage.zaehlerstand, counter, usages)}</p>
                <p class="list-usage-difference-1">${consumptionTime(usage.datum, counter, usages)}</p>
            
            </div>

            <div class="list-usage-delete">
                <img src="img/delete.png" onclick="deleteUsage('${usage.id}')">
            </div>
          
          
          `;
 
          counter = counter +1
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

function consumptionImage(counter,usages){
    if (counter < usages.length){
        
        return `<img src="img/energy-consumption_dark.png">`
    }
    else{
    return"";
    }

}

function consumptionSinceLastTime(newConsumption,counter,usages) {
    if (counter < usages.length){
        var difference = (newConsumption - usages[counter].zaehlerstand).toFixed(2);
        var differencekWh = difference + " kWh";
        return `<p class="list-usage-difference-1">` + differencekWh + `</p>`;
    }
    else{
    return "";
    }
}

function consumptionTime(datum, counter, usages){
    if(counter < usages.length){
        var timeDifference = formatDate(new Date(usages[counter].datum)) + " - " + formatDate(new Date (datum));
        return `<p class="list-usage-difference-2">`+timeDifference+`</p>`;
    }
    else{
        return"";
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
