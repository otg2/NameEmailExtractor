chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({selectionValue: "both"}, function() {
    console.log("SelectionValue set to both on init");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'rebel.netlight.com'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

