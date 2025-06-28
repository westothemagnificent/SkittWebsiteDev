const softwareDropDown = document.getElementById("softwareDropDown");
const gameDropDown = document.getElementById("gameDropDown");
const logo =  document.getElementsByClassName("logo")[0];

let linksSoft = {
             "skitt": "/skitt",
             "skitt8": "/skitt8",
             "cppWindow": "/cppWindow",
             "kotlinWindow": "/kotlinWindow",
             "pythonObjectDetection" : "/pythonObjectDetection",
             "reset": "/"
}

let linksGame = {
             "submarineGame": "/submarineGame",
             "WaterReactor" : "/WaterReactor",
             "reset": "/"
}


softwareDropDown.onchange = (event) => {
     let inputText = event.target.value;
     document.location.href = document.location + "software" + linksSoft[inputText]
    
 }

gameDropDown.onchange = (event) => {
     let inputText = event.target.value;
     document.location.href = document.location + "games" + linksGame[inputText]
    
 }