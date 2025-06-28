import * as Globals from './globals.js';

const downloadsButton = Globals.get(".downloadButton");
const reportBugButton = Globals.get(".reportBugButton");
const newsButton = Globals.get(".newsButton");
const helpButton = Globals.get(".helpButton");
const logo = Globals.get(".logo");

const documentParent = window.parent.document;

logo.onclick = (event) => documentParent.location.href = Globals.URL_ROOT;

downloadsButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/downloads`;

helpButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/helpUsers`;

reportBugButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/reportBug`;

newsButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/newsPage`;
