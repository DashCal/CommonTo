class URLParameters {
    constructor(url) {
        const queryString = url.indexOf("?") !== -1 ? url.split("?")[1] : "";
        this.params = {};
        this.paramEntries = [];
        this._parseQueryString(queryString);
    }
    _parseQueryString(queryString) {
        const params = new URLSearchParams(queryString);
        for (const [key, value] of params.entries()) {
            this.params[key] = value;
            this.paramEntries.push([key, value]);
        }
    }
    getAll() {
        return this.params;
    }
    get(key) {
        return this.params[key];
    }
    bool(key) {
        if (this.params[key] == "true") {
            return true;
        } else {
            return false;
        }
    }
    string(key) {
        if (this.params[key]) {
            return this.params[key] + "";
        } else {
            return false;
        }
    }
    base64(key) {
        if (this.params[key]) {
            return DBSF(this.params[key]);
        } else {
            return false;
        }
    }
    getByIndex(index) {
        if (index >= 0 && index < this.paramEntries.length) {
            return this.paramEntries[index];
        } else {
            return null;
        }
    }
}

async function fetchJsonData(dataUrl) {
    try {
        let response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error!status:${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching JSON data:", error);
        return null;
    }
}

function DBSF(base64Str) {
    let padding = base64Str.length % 4 === 0 ? 0 : 4 - (base64Str.length % 4);
    base64Str += "=".repeat(padding);
    let binaryString = "";
    try {
        binaryString = window.atob(base64Str);
        let bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++)
            bytes[i] = binaryString.charCodeAt(i);
        return new TextDecoder("utf-8").decode(bytes);
    } catch (error) {
        return "";
    }
}

function DST(href) {
    if (href != false) window.location.href = href;
}

function ReplaceSiteTitle(title, local) {
    if (local) {
        document.title = title + " - " + DBSF("TG9jYWwgV3U=");
    } else {
        document.title = title;
    }
}

function ReplaceWithContent(Id, Content) {
    let span = document.getElementById(Id);
    if (span) {
        span.textContent = Content;
    }
}

function ReplaceAllWithContent(Class, Content) {
    let spans = document.getElementsByClassName(Class);
    if (spans && spans.length != 0) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].textContent = Content;
        }
    }
}

function ShowElement(Id, Or) {
    let element = document.getElementById(Id);
    if (element) {
        if (!Or) {
            if (element.classList.contains("none")) { }
            else {
                element.classList.add("none");
            }
        } else {
            if (element.classList.contains("none")) { element.classList.remove("none"); }
            else { }
        }
    }
}

let goStraightUrl = DBSF("aHR0cHM6Ly9sb2NhbHd1LnRvcA==");
let primaryUrl = DBSF("aHR0cHM6Ly90by5sb2NhbHd1LnRvcC9SdWxlL1ByaW1hcnlSZWxhdGlvbnMuanNvbg==");
let minorUrl = DBSF("aHR0cHM6Ly90by5sb2NhbHd1LnRvcC9SdWxlL01pbm9yUmVsYXRpb25zLmpzb24=");
let commonUrl = DBSF("aHR0cHM6Ly90by5sb2NhbHd1LnRvcC9SdWxlL0NvbW1vblJlbGF0aW9ucy5qc29u");
let allowUrl = DBSF("aHR0cHM6Ly90by5sb2NhbHd1LnRvcC9SdWxlL0FsbG93UmVsYXRpb25zLmpzb24=");
let blockUrl = DBSF("aHR0cHM6Ly90by5sb2NhbHd1LnRvcC9SdWxlL0Jsb2NrUmVsYXRpb25zLmpzb24=");
let defaultUrl = DBSF("aHR0cHM6Ly9sb2NhbHd1LnRvcA==");
let params = new URLParameters(window.location.href);
// console.log(params);
// console.log(window.location.href.indexOf("?") !== -1 ? window.location.href.split("?")[1] : "");

function goStraight() {
    DST(goStraightUrl);
}

async function fetchMatchupData(dataUrl) {
    try {
        let data = await fetchJsonData(dataUrl);
        if (data) {
            return data;
        } else {
            console.log("No data received.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function matchupPrimary() {
    let param = params.getByIndex(0);
    let list = null;
    let attempts = 0;
    let maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            let data = await fetchMatchupData(primaryUrl);
            list = data.List;

            if (param != null && param[1] == "") {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].status == true) {
                        let keys = list[i].keys;
                        keys.push(list[i].key);
                        for (let j = 0; j < keys.length; j++) {
                            if (keys[j].toLowerCase() == param[0].toLowerCase()) {
                                ShowElement("Blank", false);
                                ShowElement("Straight", true);
                                ReplaceAllWithContent("WillUrl", list[i].url);
                                window.location.href = list[i].url;
                                return;
                            }
                        }
                    }
                }
            }
            break;
        } catch (error) {
            console.error('Primary Matchup Error: ', error);
            attempts++;
            if (attempts >= maxAttempts) {
                matchupMinor();
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    matchupMinor();
}

async function matchupMinor() {
    let param = params.getByIndex(0);
    let list = null;
    let attempts = 0;
    let maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            let data = await fetchMatchupData(minorUrl);
            list = data.List;
            if (param != null && param[1] == "") {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].status == true) {
                        let keys = list[i].keys;
                        keys.push(list[i].key);
                        for (let j = 0; j < keys.length; j++) {
                            if (keys[j] == param[0]) {
                                ShowElement("Blank", false);
                                ShowElement("Straight", true);
                                ReplaceAllWithContent("WillUrl", list[i].url);
                                window.location.href = list[i].url;
                                return;
                            }
                        }
                    }
                }
            }
            break;
        } catch (error) {
            console.error('Minor Matchup Error: ', error);
            attempts++;
            if (attempts >= maxAttempts) {
                matchupCommon();
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    matchupCommon();
}

async function matchupCommon() {
    let param = params.getByIndex(0);
    let list = null;
    let attempts = 0;
    let maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            let data = await fetchMatchupData(commonUrl);
            list = data.List;
            if (param != null && param[1] == "") {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].status == true) {
                        let keys = list[i].keys;
                        keys.push(list[i].key);
                        for (let j = 0; j < keys.length; j++) {
                            if (keys[j] == param[0]) {
                                ShowElement("Blank", false);
                                ShowElement("Straight", true);
                                ReplaceAllWithContent("WillUrl", list[i].url);
                                window.location.href = list[i].url;
                                return;
                            }
                        }
                    }
                }
            }
            break;
        } catch (error) {
            console.error('Common Matchup Error: ', error);
            attempts++;
            if (attempts >= maxAttempts) {
                matchupAllow();
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    matchupAllow();
}

function isValidAndFixURL(url) {
    let protocols = ['http://', 'https://'];
    url = url.trim();
    let hasProtocol = /^(https?:\/\/)/.test(url);
    if (!hasProtocol) {
        for (let protocol of protocols) {
            const fixedUrl = protocol + url;
            if (isValidURL(fixedUrl)) {
                return fixedUrl;
            }
        }
    } else {
        if (isValidURL(url)) {
            return url;
        }
    }
    return "";
}

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
    return pattern.test(url);
}

function getUrl() {
    let url;
    let param = params.getByIndex(0);
    if (param[1][param[1].length - 1]) {
        let mode = param[1][param[1].length - 1].toLowerCase();
        if (mode != null && mode == "d") {
            url = param[0] + param[1].slice(0, -1);
            url = isValidAndFixURL(DBSF(url));
            if (url == "") {
                return null;
            } else {
                return url;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

async function matchupAllow() {
    matchupBlock();
}

async function matchupBlock() {
    ReplaceSiteTitle("Redirection Error× 跳转出错×", true);
    ShowElement("Blank", false);
    ShowElement("Fail", true);
}

/* MAIN */

function main() {
    if (params.paramEntries.length == 0) {
        ReplaceSiteTitle("JumpTo 在这里，安全着陆", true)
        ShowElement("Blank", false);
        ShowElement("HeaderLogo", false);
        ShowElement("JumpTo", true);
    } else {
        matchupPrimary();
    }
}

function onloads() {
    PCS();
    main();
}
window.onload = onloads;
