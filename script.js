document.addEventListener("DOMContentLoaded", () => {
    const langParam = new URLSearchParams(window.location.search).get("lang");
    const defaultLang = navigator.language.slice(0, 2);
    const supported = ["fr", "en", "zh"];
    const lang = supported.includes(langParam) ? langParam :
                 supported.includes(defaultLang) ? defaultLang : "fr";

    fetch('content.json')
        .then(res => res.json())
        .then(data => {
            document.documentElement.lang = lang;
            document.getElementById("title").innerText = data.title[lang];
            document.getElementById("header").innerText = data.header[lang];
            document.getElementById("description").innerText = data.description[lang];
            document.getElementById("video-frame").src = data.video[lang];
        });

    document.querySelectorAll("#lang-switcher button").forEach(btn => {
        btn.addEventListener("click", () => {
            const selected = btn.getAttribute("data-lang");
            const url = new URL(window.location);
            url.searchParams.set("lang", selected);
            window.location.href = url.toString();
        });
    });
});
