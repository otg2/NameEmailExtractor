
document.getElementById('extractValues').addEventListener('click', getValues);

function getValues() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {command: "init", hide: true}, function(response) {

          var resultElement = document.getElementById("result");
          resultElement.value = response.result;

          resultElement.select();
          resultElement.setSelectionRange(0, 99999); /* For mobile devices */

          // Copy to clipboard
          document.execCommand("copy");

          var today = new Date();
          var timestamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          
          var notification = document.getElementById("notification");
          notification.innerHTML = "Selection copied to clipboard at "+ timestamp;
          
      });
  });
};


