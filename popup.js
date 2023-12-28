const checkPayPal = () => {
  const dom = [...document.querySelectorAll('script')];
  var pay = null
  dom.forEach((el)=>{
    if(el?.innerHTML.toLowerCase().includes('paypal')){
      pay = el
    }
   
  })
 
  return pay;
}


document.addEventListener('DOMContentLoaded', function() {
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: checkPayPal
      }, (result) => {
        if(result && result[0].result !==null){
          document.getElementById("PayPal").innerHTML = "Yes"
        }
        else{
          document.getElementById("PayPal").innerHTML = "No"
        }
      });
      var currentTab = tabs[0];
          if (currentTab.url.startsWith('https://')) {
        document.getElementById("SSL").innerHTML = "Yes"
      } else {
        document.getElementById("SSL").innerHTML = "No"

      }
    });
  });
