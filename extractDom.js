
document.getElementById('extractValues').addEventListener('click', getValues);
var userSelection = document.getElementsByName('selection');
for(var i = 0; i < userSelection.length; i++) {
  userSelection[i].addEventListener('click', setSelection);
}

chrome.storage.sync.get('selectionValue', function(data) {
  var selectionValue = document.getElementsByName('selection'); 
  for(i = 0; i < selectionValue.length; i++) { 
      if(selectionValue[i].value == data.selectionValue) 
        selectionValue[i].checked = true;
  } 
  updateButtonLabel(data.selectionValue);
});

function setSelection()
{
  var selectionValue = document.getElementsByName('selection'); 
  var value = "";
  for(i = 0; i < selectionValue.length; i++) { 
      if(selectionValue[i].checked) 
        value = selectionValue[i].value;
  } 
  chrome.storage.sync.set({'selectionValue': value}, function() {
    console.log('The selectionValue is '+ value);
  });
  updateButtonLabel(value);
}

function updateButtonLabel(value)
{
  var innerHtmlValue = value == "both" ? "name, email" : value;
  document.getElementById('extractValues').innerHTML = "Click here to extract [" +  innerHtmlValue + "]"
}

function getValues() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var selectionData = "";
    chrome.storage.sync.get('selectionValue', function(data) {
      selectionData=data.selectionValue;
      chrome.tabs.sendMessage(tabs[0].id, {selection: selectionData}, function(response) {

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
  });
};



