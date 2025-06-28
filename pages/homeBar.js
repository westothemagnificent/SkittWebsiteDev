import * as Globals from './globals.js';
import { ElementBlinker } from './ElementBlinker.js';

const downloadsButton = Globals.get(".downloadButton");
const reportBugButton = Globals.get(".reportBugButton");
const newsButton = Globals.get(".newsButton");
const helpButton = Globals.get(".helpButton");
const logo = Globals.get(".logo");

const warringText = Globals.get(".shutDownWarringText");

const documentParent = window.parent.document;

logo.onclick = (event) => documentParent.location.href = Globals.URL_ROOT;

downloadsButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/downloads`;

helpButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/helpUsers`;

reportBugButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/reportBug`;

newsButton.onclick = (event) => documentParent.location.href = `${Globals.URL_ROOT}/newsPage`;

// handle blinking on the warning text every 500ms
const warningBlinker = new ElementBlinker(warringText, ["orange", "red"], ["#ff8c00", "#8B0000"], 500);