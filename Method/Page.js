function PCS() {
    let body = document.body;
    if (body.classList.contains("darkMode")) {
        body.classList.remove("darkMode");
    }
    if (body.classList.contains("lightMode")) {
        body.classList.remove("lightMode");
    }
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        body.classList.add("darkMode");
    } else {
        body.classList.add("lightMode");
    }
}