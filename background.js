chrome.browserAction.onClicked.addListener(function(tab) {
    var url = tab.url;
    if (url.startsWith("https://")) {
    //   alert("This page has SSL.");
      console.log('works')
    } else {
      alert("This page does not have SSL.");
    }
  });
  