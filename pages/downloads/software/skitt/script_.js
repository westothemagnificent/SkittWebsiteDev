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

addDownload("0.1","https://github.com/westothemagnificent/skitt/raw/main/skittIntsaller%20for%200.1%20beta.zip", "Windows")

