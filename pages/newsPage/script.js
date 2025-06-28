/* global io */

const socket = io("/", { transports: ["websocket"] });

// html suff

// colors

let colors = { "bug": "red", "drop": "orange", "hold": "yellow", "announcement": "green" };
let colorsOutLines = { "bug": "#8B0000", "drop": "#ff8c00 ", "hold": "#d4af37", "announcement": "#006400" };

// keys

let severityKeys = {"bug": 4, "drop": 3, "hold": 2, "announcementt": 1}


const newsReportsDiv = document.getElementsByClassName("newsReports")[0];

// utills

function convertUTCDateToLocalDate(utcDate) {
  // get timezone offset in minutes and convert to milliseconds
  const offsetMs = utcDate.getTimezoneOffset() * 60 * 1000;
  // create new Date by subtracting the offset from UTC time
  return new Date(utcDate.getTime() - offsetMs);
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}


function changeStyleOfElements(){
  console.log(arguments)
  for(let i=2; i<arguments.length; i++){
    console.log(arguments[i])
    arguments[i].style[arguments[0]] = arguments[1] 
  }
}

function createNewsReport(severity, text, date) {
    const newsReportDiv = document.createElement("div");
    
    
    // Add classes
    newsReportDiv.className = "newsReport BUTTON HOVER_ENLARGE_SMALL CLICK_SHRINK_SMALL SMOOTH_ALL";
  
    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    
    const dateTime = new Date(date);
    
    const dateSpan = document.createElement("span");
    dateSpan.textContent = " - date: " + `${dateTime.getUTCMonth() + 1}/${dateTime.getUTCDate()}/${dateTime.getUTCFullYear()}`;
  
    const timeAgoSpan = document.createElement("span");
  
    timeAgoSpan.textContent = " (" + timeAgo(dateTime) + ")";
  
    newsReportDiv.appendChild(textSpan);
    newsReportDiv.appendChild(dateSpan);
    //newsReportDiv.appendChild(timeAgoSpan);

    // set color
    changeStyleOfElements("backgroundColor", colors[severity], newsReportDiv)
    newsReportDiv.style.outlineColor = colorsOutLines[severity]
  
    newsReportsDiv.appendChild(newsReportDiv)
    console.log(newsReportDiv)
}

socket.on("newsReports", function (data) {
    newsReportsDiv.innerHTML = ""
    console.log(data)
    
    for(let i=0; i < data.length; i++){
        let splitData = data[i].split("@")
        if(splitData[0] != ""){
          createNewsReport(splitData[1], splitData[0], splitData[2], i)
        }
      }
  
});

//createNewsReport('blue', 'Example news text', '2024-09-27');

socket.emit("getNewsReports")