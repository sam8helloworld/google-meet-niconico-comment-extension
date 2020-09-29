let inRoom = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "confirmExecution") {
        if (inRoom) {
            sendResponse({state: false});
            return;
        }
        if (!document.querySelector(".pHsCke")) {
            sendResponse({state: false});
            return;
        }
        inRoom = true;
        sendResponse({state: true});
    }
});