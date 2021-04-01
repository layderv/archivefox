function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true,
    active: true
  });
}

var port = browser.runtime.connectNative("archivefox");

port.onMessage.addListener((response) => {
  console.log("Received: " + response);
});

browser.browserAction.onClicked.addListener(() => {
  browser.storage.local.get('archiveBoxDirectory')
    .then((res) => {
      getActiveTab().then((tabs) => {
        const tab = tabs[0];
        if (tab) {
          let directory = res['archiveBoxDirectory'] || '~/archivebox';
          let s = JSON.stringify({directory: directory, url: tab.url});
          console.log("Sending:  ", s);
          port.postMessage(s);
        }
      });
    });
});

