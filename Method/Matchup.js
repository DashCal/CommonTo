//class URLParameters { constructor(url) { const queryString = (url.indexOf('?') !== -1) ? url.split('?')[1] : ''; this.params = {}; this.paramEntries = []; this._parseQueryString(queryString) } _parseQueryString(queryString) { const params = new URLSearchParams(queryString); for (const [key, value] of params.entries()) { this.params[key] = value; this.paramEntries.push([key, value]) } } getAll() { return this.params } get(key) { return this.params[key] } bool(key) { if (this.params[key] == "true") { return true } else { return false } } string(key) { if (this.params[key]) { return this.params[key] + "" } else { return false } } base64(key) { if (this.params[key]) { return DBSF(this.params[key]) } else { return false } } getByIndex(index) { if (index >= 0 && index < this.paramEntries.length) { return this.paramEntries[index] } else { return null } } } function DBSF(base64Str) { let padding = base64Str.length % 4 === 0 ? 0 : 4 - (base64Str.length % 4); base64Str += '='.repeat(padding); let binaryString = ""; try { binaryString = window.atob(base64Str); let bytes = new Uint8Array(binaryString.length); for (let i = 0; i < binaryString.length; i++)bytes[i] = binaryString.charCodeAt(i); return new TextDecoder('utf-8').decode(bytes) } catch (error) { return "" } } function DST(href) { if (href != false) window.location.href = href } let primaryUrl = 'aHR0cHM6Ly90by5sb2NhbHd1LnRvcC9SdWxlL1ByaW1hcnlSZWxhdGlvbnMuanNvbg=='; async function fetchJsonData(dataUrl) { try { let response = await fetch(dataUrl); if (!response.ok) { throw new Error(`HTTP error!status:${response.status}`) } let data = await response.json(); return data } catch (error) { console.error('Error fetching JSON data:', error); return null } } let goStraightUrl = DBSF('aHR0cHM6Ly9sb2NhbHd1LnRvcA=='); function goStraight() { DST(goStraightUrl) } (async () => { let data = await fetchJsonData(DBSF(primaryUrl)); if (data) { let params = new URLParameters(window.location.href); MatchupPrimary(data.Pairs, params.getByIndex(0)) } else { console.log('No data received.') } })(); function MatchupPrimary(pairs, primary) { if (primary != null && primary[1] == "") { for (let i = 0; i < pairs.length; i++) { if (pairs[i].name == primary[0] && pairs[i].status == true) { goStraightUrl = pairs[i].url; window.location.href = pairs[i].url; return 0 } } } MatchupMinor() } function MatchupMinor() { MatchupCommon() } function MatchupCommon() { DST(DBSF('aHR0cHM6Ly9sb2NhbHd1LnRvcA==')) }

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

function goStraight() {
    DST(goStraightUrl);
}

let goStraightUrl = DBSF("aHR0cHM6Ly9sb2NhbHd1LnRvcA==");
let primaryUrl = DBSF("aHR0cHM6Ly90by5sb2NhbHd1LnRvcC9SdWxlL1ByaW1hcnlSZWxhdGlvbnMuanNvbg==");
let minorUrl = DBSF("");
let commonUrl = DBSF("");
let allowUrl = DBSF("");
let blockUrl = DBSF("");
let defaultUrl = "aHR0cHM6Ly9sb2NhbHd1LnRvcA==";

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
    let param = URLParameters(window.location.href).getByIndex(0);
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
                                window.location.href = list[i].url;
                                return;
                            }
                        }
                    }
                }
            }
            break; // 数据获取成功且无需重试，跳出循环
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

matchupPrimary();

function matchupMinor() {
    matchupCommon();
}

function matchupCommon() {
    matchupAllow();
}

function matchupAllow() {
    matchupBlock();
}

function matchupBlock() {
    DST(defaultUrl);
}
