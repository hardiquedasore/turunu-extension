//Checks the scripts of the website for PayPal Script 
const checkPayPal = () => {
  const dom = [...document.querySelectorAll('script')];
  var pay = null
  dom.forEach((el) => {
    if (el?.innerHTML.toLowerCase().includes('paypal')) {
      pay = el
    }
  })
  return pay;
}

//Returns the text on the webpage in a lowercase string format
const domText = () => {
  return document.body.innerText.toLowerCase()
}


document.addEventListener('DOMContentLoaded', function () {
  var meter = 0

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: checkPayPal
    }, (result) => {
      //Toggle for the PayPal check
      if (result && result[0].result !== null) {
        document.getElementById("PayPal").innerHTML = "Yes";
        meter += 72
      }
      else {
        document.getElementById("PayPal").innerHTML = "No"
      }
    });

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: domText
    }, (result) => {
      //Toggle for the Privacy Policy check
      if (result[0].result.indexOf('privacy') > -1) {
        document.getElementById("privacy").innerHTML = "Yes"
        meter += 72
      } else {
        document.getElementById("privacy").innerHTML = "No"
      }
      //Toggle for the Privacy Policy check
      if (result[0].result.indexOf('refund') > -1) {
        document.getElementById("refund").innerHTML = "Yes"
        meter += 72
      } else {
        document.getElementById("refund").innerHTML = "No"
      }
    });
    //API call to find the country of website's server
    var currentTab = tabs[0];
    fetch('https://ipwhois.app/json/' + currentTab.url.replace(/(^\w+:|^)\/\//, ''))
      .then(res => res.json())
      .then((out) => {
        document.getElementById("country").innerHTML = out.country_code;
        meter += 72

        //Meter offset based on the parameters checked
        document.getElementById("meter-1").style = "stroke-dashoffset:" + (meter == 0 ? 360 : 360 - meter)
        if (meter == 72) {
          document.getElementById("meter-1").style.animationName = "progress-2"
        }
        else if (meter == 144) {
          document.getElementById("meter-1").style.animationName = "progress-1"
        }
        else if (meter == 216) {
          document.getElementById("meter-1").style.animationName = "progress-4"
        }
        else if (meter == 288) {
          document.getElementById("meter-1").style.animationName = "progress-5"
        }

      }).catch(err => console.error(err));

    //Toggle for the SSL Certificate check
    if (currentTab.url.startsWith('https://')) {
      document.getElementById("SSL").innerHTML = "Yes"
      meter += 72
    } else {
      document.getElementById("SSL").innerHTML = "No"
    }
  });
});
