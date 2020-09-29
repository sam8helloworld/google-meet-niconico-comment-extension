chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.status === "complete" && tab.url.indexOf('https://meet.google.com/') !== -1) {
        chrome.tabs.sendMessage(tabId, {type: "confirmExecution"}, function (response) {
            if (!response.state) {
                return;
            }
            chrome.tabs.executeScript({
                file: 'js/app.js'
            });
        });
    }
});