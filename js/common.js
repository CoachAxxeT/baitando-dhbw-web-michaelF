function loadStoredUsage() {
  var storedUsageJson = localStorage.getItem("usage");
  if (storedUsageJson) {
      var usage = JSON.parse(storedUsageJson);
      console.debug(`Count of loaded tasks: ${usage.length}`);
      return usage;
  }

  return [];
}


function storeUsage(usage) {
  if (usage) {
      localStorage.setItem("usage", JSON.stringify(usage));
      console.debug(`Count of stored tasks: ${usage.length}`);
  } else {
      console.error("No tasks to store");
  }
}