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
    let param = params.getByIndex(0);
    let url = getUrl();
    let attempts = 0;
    let maxAttempts = 5;

    if (url == null) {
        ShowElement("Blank", false);
        ShowElement("Fail", true);
        return;
    }

    // 提取 URL 的域名部分（不包括路径、查询参数等）
    function getDomainFromUrl(url) {
        try {
            const hostname = new URL(url).hostname;
            console.log(hostname.split('.'));
            return hostname.split('.');
        } catch (error) {
            console.error('Error extracting domain:', error);
            return [];
        }
    }

    // 检查域名是否与模式匹配（支持通配符 *）
    function matchesDomainPattern(domain, pattern) {
        const patternParts = pattern.split('*').map(p => p.split('.')).flat().filter(Boolean);
        const domainParts = domain;

        if (patternParts.length !== domainParts.length - 1) {
            return false;
        }

        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i] !== '' && patternParts[i] !== domainParts[i + 1]) {
                return false;
            }
        }

        return true;
    }

    while (attempts < maxAttempts) {
        try {
            let data = await fetchMatchupData(allowUrl);
            const list = data.List;

            for (const item of list) {
                if (item.status === true) {
                    const paramDomain = getDomainFromUrl(param);
                    const itemDomainPattern = item.domain.split('.');

                    // 简单处理通配符，这里假设通配符只在域名的最开始位置
                    if (itemDomainPattern[0] === '*') {
                        itemDomainPattern.shift(); // 移除通配符部分
                        if (matchesDomainPattern(paramDomain.slice(1), itemDomainPattern)) {
                            ShowElement("Blank", false);
                            ShowElement("Straight", true);
                            ReplaceAllWithContent("WillUrl", param);
                            window.location.href = param;
                            return;
                        }
                    } else {
                        // 如果不通配，则直接全匹配
                        if (JSON.stringify(paramDomain) === JSON.stringify(itemDomainPattern)) {
                            // 注意：这里全匹配可能不太实际，因为 URL 可能包含路径等
                            // 通常我们只比较域名部分，上面的通配符处理已经足够
                            // 如果确实需要全匹配（包括路径等），则应该重新考虑逻辑

                            // 但为了示例，我们仍然保留这个分支（尽管它可能不会被执行）
                            ShowElement("Blank", false);
                            ShowElement("Straight", true);
                            ReplaceAllWithContent("WillUrl", param);
                            window.location.href = param;
                            return;
                        }
                    }
                }
            }

            break; // 如果没有找到匹配项，则退出循环
        } catch (error) {
            console.error('Allow Matchup Error:', error);
            attempts++;
            if (attempts >= maxAttempts) {
                matchupBlock();
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // 等待一秒后再重试
        }
    }

    // 如果所有尝试都失败了，则执行 matchupBlock()
    matchupBlock();
}

// 注意：您需要确保以下函数在您的代码中是可用的
// function fetchMatchupData(url) { ... }
// function ShowElement(elementId, show) { ... }
// function ReplaceAllWithContent(elementId, content) { ... }
// function matchupBlock() { ... }

// async function matchupAllow() {
//     let param = DBSF(window.location.href.indexOf("?") !== -1 ? window.location.href.split("?")[1] : "");
//     let list = null;
//     let attempts = 0;
//     let maxAttempts = 5;

//     while (attempts < maxAttempts) {
//         try {
//             let data = await fetchMatchupData(allowUrl);
//             list = data.List;
//             if (param != null && param != "") {
//                 for (let i = 0; i < list.length; i++) {
//                     if (list[i].status == true) {
//                         let domain = list[i].domain.indexOf(".") !== -1 ? window.location.href.split("?")[1] : "";
//                         for (let j = 0; j < domain.length; j++) {
//                             if (keys[j] == param[0]) {
//                                 ShowElement("Blank", false);
//                                 ShowElement("Straight", true);
//                                 ReplaceAllWithContent("WillUrl", list[i].url);
//                                 window.location.href = list[i].url;
//                                 return;
//                             }
//                         }
//                     }
//                 }
//             }
//             break;
//         } catch (error) {
//             console.error('Allow Matchup Error: ', error);
//             attempts++;
//             if (attempts >= maxAttempts) {
//                 matchupBlock();
//                 return;
//             }
//             await new Promise(resolve => setTimeout(resolve, 1000));
//         }
//     }
//     matchupBlock();
// }

async function matchupBlock() {
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
                matchupMinor();
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    ShowElement("Blank", false);
    ShowElement("Fail", true);
}

/* MAIN */

function main() {
    if (params.paramEntries.length == 0) {
        ReplaceSiteTitle("JumpTo", true)
        ShowElement("Blank", false);
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
