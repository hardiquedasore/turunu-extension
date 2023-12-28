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
  var paypalMeter = 0
  var sslMeter = 0

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: checkPayPal
      }, (result) => {
        if(result && result[0].result !==null){
          document.getElementById("PayPal").innerHTML = "Yes"
          paypalMeter = 120
        }
        else{
          document.getElementById("PayPal").innerHTML = "No"
          paypalMeter = 0
        }
        var total = sslMeter+ paypalMeter
      document.getElementById("meter-1").style =  "stroke-dashoffset:"+ (total ==0?360:360-total)

      if(total == 240){
        document.getElementById("meter-1").style.animationName = "progress-2"

      }
      else if(total ==120){
        document.getElementById("meter-1").style.animationName = "progress-1"
      }
      });
      var currentTab = tabs[0];
          if (currentTab.url.startsWith('https://')) {
        document.getElementById("SSL").innerHTML = "Yes"
        sslMeter = 120
      } else {
        document.getElementById("SSL").innerHTML = "No"
        sslMeter = 0

      }
      
    });
  });
