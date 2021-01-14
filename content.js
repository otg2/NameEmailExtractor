
var filteredTableAsDom=function(){
    var nameEmailArray = [];
    // Find element and add values to array
    $("table.dataTable tr").each(function() {
        var valueOfRow = [];

        var nameDiv = $(this).find('.name');
        var nameValue = nameDiv.text();
        
        var mailDiv = $(this).find('.mail');
        var mailValue = $(mailDiv).find('a').attr('href');

        // No reason to add someone if email is missing
        if(mailValue)
        {
            var mailValueToString = mailValue+"";
            valueOfRow.push(nameValue);
            valueOfRow.push(mailValueToString.replace('mailto:', '')); 
            nameEmailArray.push(valueOfRow);
        }
    });


    // Parse
    var valueString = "";
    nameEmailArray.forEach(nameAndEmail => {
      var text = nameAndEmail[0] + ", " + nameAndEmail[1] + '\r\n'; 
      valueString = valueString + text; 
    });
    return valueString;
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    var domContent = filteredTableAsDom();
    sendResponse({result: domContent});
});

