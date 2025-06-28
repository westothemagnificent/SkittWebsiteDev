import * as Globals from '../globals.js';

// html items

const reportBug = Globals.get(".reportBug");
const reportBugInput = Globals.get(".reportBugInput");
const reportBugButton = Globals.get(".reportBugButton");
const bugDorpDown = Globals.get(".bugDropDown");
const bugReportWaper = Globals.get(".bugReportWaper");
const refershButton = Globals.get(".refershButton");
const sortByDorpDown = Globals.get(".sortByDorpDown");
const sortOrderWrapper = Globals.get(".sortOrderWrapper");

const socket = io("/", { transports: ["websocket"] });

let dorpDownValue = ""

let fliter = "send order"

// colors

let colors = { "breaks every thing": "red", "memory leak :(": "orange", "bad": "yellow", "I can live with it": "green", "reset": "#abdbff", "recommendation": "mediumpurple" };
let colorsOutLines = { "breaks every thing": "#8B0000", "memory leak :(": "#ff8c00 ", "bad": "#d4af37", "I can live with it": "#006400", "reset": "#6AA5E9", "recommendation": "#673AB7" };

// keys

let severityKeys = { "breaks every thing": 4, "memory leak :(": 3, "bad": 2, "I can live with it": 1, "reset": -1, "recommendation": 0 }

// store eneter password

let enteredPassword = ""

refershButton.onclick = (event) => {
    bugReportWaper.innerHTML = ""
    socket.emit("getBugReports")
}

function makeBugReport(report, severity, status, index) {
    let bugReportDiv = document.createElement('div');
    bugReportDiv.classList.add('bugReport', 'SMOOTH_ALL', 'HOVER_ENLARGE_SMALL', 'CLICK_SHRINK_SMALL');


    // if adaim trys to edit
    bugReportDiv.addEventListener('click', function () {
        let inputCode = prompt("to edit enter code: ")
        if (inputCode != "") {
            socket.emit("enteredPassword", inputCode, "bugReportEdit", index)
            enteredPassword = inputCode
        }
        else {
            socket.emit("enteredPassword", enteredPassword, "bugReportEdit", index)
        }

    });

    bugReportDiv.style.backgroundColor = colors[severity];
    bugReportDiv.style.outlineColor = colorsOutLines[severity]

    let reportSpan = document.createElement('span');
    reportSpan.textContent = 'Report: ' + report + " - ";

    let severitySpan = document.createElement('span');
    severitySpan.textContent = 'Severity: ' + severity + " - ";

    let statusSpan = document.createElement('span');
    statusSpan.textContent = 'Status: ' + status + " ";

    bugReportDiv.appendChild(reportSpan);
    bugReportDiv.appendChild(severitySpan);
    bugReportDiv.appendChild(statusSpan);

    bugReportWaper.appendChild(bugReportDiv);
}

// send bug reports
reportBugButton.onclick = (event) => {
    if (reportBugInput.value != "" && !reportBugInput.value.includes("@") && dorpDownValue != "") {
        let send = reportBugInput.value + "@" + dorpDownValue + "@ UNKOWN";
        socket.emit("bugReport", send)
        socket.emit("getBugReports")

        reportBugInput.value = "";
        bugDorpDown.selectedIndex = 0;
        bugReportWaper.innerHTML = ""

        Globals.changeStyleOfElements("backgroundColor", colors["reset"], reportBug, bugDorpDown, reportBugInput, reportBugButton, sortOrderWrapper, sortByDorpDown)
        Globals.changeStyleOfElements("border-color", colorsOutLines["reset"], reportBugInput, reportBugButton, sortByDorpDown, bugDorpDown)
        reportBug.style.outlineColor = colorsOutLines["reset"]
        sortOrderWrapper.style.outlineColor = colorsOutLines["reset"]
    }

    else if (reportBugInput.value.includes("@")) {
        alert("You can not sumbit a report with a @ smybol!")
    }

    else {
        alert("You can not sumbit a blank report!")
    }
};

bugDorpDown.onchange = (event) => {
    let inputText = event.target.value;
    dorpDownValue = inputText
    Globals.changeStyleOfElements("backgroundColor", colors[inputText], reportBug, bugDorpDown, reportBugInput, reportBugButton, sortOrderWrapper, sortByDorpDown)
    Globals.changeStyleOfElements("border-color", colorsOutLines[inputText], reportBugInput, reportBugButton, sortByDorpDown, bugDorpDown)
    reportBug.style.outlineColor = colorsOutLines[inputText]
    sortOrderWrapper.style.outlineColor = colorsOutLines[inputText]
};

sortByDorpDown.onchange = (event) => {
    let inputText = event.target.value;
    fliter = inputText
    socket.emit("getBugReports")
};


socket.on("bugReports", function (data) {
    bugReportWaper.innerHTML = ""
    console.log(data)
    if (fliter == "send order") {
        for (let i = 0; i < data.length; i++) {
            let splitData = data[i].split("@")
            if (splitData[0] != "") {
                makeBugReport(splitData[0], splitData[1], splitData[2], i)
            }
        }
    }
    if (fliter == "bugs") {
        for (let i = 0; i < data.length; i++) {
            let splitData = data[i].split("@")
            if (splitData[0] != "" && splitData[1] != "recommendation") {
                makeBugReport(splitData[0], splitData[1], splitData[2], i)
            }
        }
    }
    if (fliter == "recommendations") {
        for (let i = 0; i < data.length; i++) {
            let splitData = data[i].split("@")
            if (splitData[0] != "" && splitData[1] == "recommendation") {
                makeBugReport(splitData[0], splitData[1], splitData[2], i)
            }
        }
    }
    if (fliter == "severity") {
        console.log("sorting...")


        data = data.sort((a, b) => severityKeys[b.split("@")[1]] - severityKeys[a.split("@")[1]]);
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let splitData = data[i].split("@")
            if (splitData[0] != "") {
                makeBugReport(splitData[0], splitData[1], splitData[2], i)
            }
        }
    }
});

// password correct

socket.on("passwordCorrect", function (data, ectData) {
    if (data == "bugReportEdit") {
        alert("password correct")
        let action = prompt("What would you like to do?")
        if (action == "remove") {

            socket.emit("replaceDataLineFromReportBugFile", ectData[2], "", enteredPassword)
            alert("removing")
            socket.emit("getBugReports")
        }

        if (action == "su") {

            socket.emit("bugReportStatusUpdate", prompt("new status"), ectData[2], enteredPassword)
            alert("editing")
            socket.emit("getBugReports")
        }
    }
});

socket.on("passwordIncorrect", function (data, ectData) {
    if (data == "bugReportEdit") {
        alert("password incorrect")
    }
});

socket.emit("getBugReports")


// reset color
Globals.changeStyleOfElements("backgroundColor", colors["reset"], reportBug, bugDorpDown, reportBugInput, reportBugButton)
reportBug.style.outlineColor = colorsOutLines["reset"]
sortOrderWrapper.style.outlineColor = colorsOutLines["reset"]
