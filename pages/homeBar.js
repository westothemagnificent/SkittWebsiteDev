function get(query) {
  return document.querySelector(query);
}

const downloadsButton = get(".downloadButton");
const reportBugButton = get(".reportBugButton");
const newsButton      = get(".newsButton");
const helpButton      = get(".helpButton");
const logo            = get(".logo");

const warringText = get(".shutDownWarringText");

const documentParent = window.parent.document;

let warringTextFlash = true;

logo.onclick = (event) => {
    documentParent.location.href = "https://skitt.glitch.me/";
}

downloadsButton.onclick = (event) => {
    documentParent.location.href = "https://skitt.glitch.me/downloads";
}

helpButton.onclick = (event) => {
    documentParent.location.href = "https://skitt.glitch.me/helpUsers";
}

reportBugButton.onclick = (event) => {
    documentParent.location.href = "https://skitt.glitch.me/reportBug";
}

newsButton.onclick = (event) => {
    documentParent.location.href = "https://skitt.glitch.me/newsPage";
}

function changeStyleOfElements(){
  for(let i=2; i<arguments.length; i++){
    arguments[i].style[arguments[0]] = arguments[1] 
  }
}

function updateWarringText() {
  
  warringTextFlash = !warringTextFlash;
  
  if (warringTextFlash) {
    changeStyleOfElements("backgroundColor", "orange", warringText)
    warringText.style.outlineColor = "#ff8c00"
  }
  else {
     changeStyleOfElements("backgroundColor", "red", warringText)
      warringText.style.outlineColor = "#8B0000"
  }
  
}


changeStyleOfElements("backgroundColor", "red", warringText)
warringText.style.outlineColor = "#8B0000"

setInterval(updateWarringText, 500);