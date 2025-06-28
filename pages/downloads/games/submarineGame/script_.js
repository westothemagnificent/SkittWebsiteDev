const windowsOS = document.querySelector('.windows')
const linuxOS = document.querySelector('.linux')
const macOS = document.querySelector('.mac')


function addDownload(version, link, OS){

  const element = document.createElement("button");
  element.classList.add("downloadButton")
  element.classList.add("BUTTON")
  element.classList.add("HOVER_ENLARGE")
  element.classList.add("CLICK_SHRINK")
  element.classList.add("SMOOTH_ALL")
  element.textContent = version;
  element.addEventListener("click", () => {

    downloadURI(link, "donwload")

  });

  if(OS == "Windows"){
    windowsOS.appendChild(element)
  }
  else if(OS == "Linux"){
    linuxOS.appendChild(element)
  }
  else if (OS == "Mac"){
    macOS.appendChild(element)
  }
  else{
    console.log(OS, " is not a vaild OS")
  }
}

function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

addDownload("submarine game 0.36.4.1 (OLD)", "https://github.com/westothemagnificent/submarineGame/releases/download/game/subGameBeta0.36.4.1.zip", "Windows")

addDownload("submarine game 0.36.6 (OLD)", "https://github.com/westothemagnificent/submarineGame/releases/download/gameWINDOWS0.36.6/subGameBeta0.36.6.zip", "Windows")

addDownload("submarine game 0.36.7 (CURRENT)", "https://github.com/westothemagnificent/submarineGame/releases/download/gameWINDOWS0.36.7/subGameBeta0.36.7.zip", "Windows")



addDownload("submarine game 0.36.4.1 (UNTESTED) (OLD)", "https://github.com/westothemagnificent/submarineGame/releases/download/game/subGameBeta0.36.4.1.zip", "Linux")

addDownload("submarine game 0.36.6 (UNTESTED) (CURRENT)", "https://github.com/westothemagnificent/submarineGame/releases/download/gameLINUX0.36.6/subGameBeta0.36.6.zip", "Linux")



addDownload("submarine game 0.36.4.1 (OLD)", "https://github.com/westothemagnificent/submarineGame/releases/download/gameMac/subGameBeta0.36.4.1.zip", "Mac")
addDownload("submarine game 0.36.6 (CURRENT)", "https://github.com/westothemagnificent/submarineGame/releases/download/gameMAC0.36.6/subGameBeta0.36.6.zip", "Mac")
