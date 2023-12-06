document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var currentTab = tabs[0];
      if (currentTab.url.startsWith('https://')) {
        document.getElementById("SSL").innerHTML = "Yes"
      } else {
        document.getElementById("SSL").innerHTML = "No"

      }
    });
  });