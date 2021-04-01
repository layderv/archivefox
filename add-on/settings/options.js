function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    archiveBoxDirectory: document.querySelector("#directory").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#directory").value = result.archiveBoxDirectory || "~/archivebox";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get("archiveBoxDirectory");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

