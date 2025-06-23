document.addEventListener("DOMContentLoaded", () => {
  const langParam = new URLSearchParams(window.location.search).get("lang");
  const defaultLang = navigator.language.slice(0, 2);
  const supported = ["fr", "en", "zh", "ar"];
  const lang = supported.includes(langParam) ? langParam :
               supported.includes(defaultLang) ? defaultLang : "fr";

  // Appliquer la direction d’écriture (RTL pour arabe)
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  fetch("content.json")
    .then(res => res.json())
    .then(data => {
      // Titre & en-tête
      document.getElementById("title").innerText = data.title[lang];
      document.getElementById("header").innerText = data.title[lang];

      // Titres des sections
      document.getElementById("section-presentation-title").innerText = data.sections.presentation[lang];
      document.getElementById("section-skills-title").innerText = data.sections.skills[lang];
      document.getElementById("section-projects-title").innerText = data.sections.projects[lang];
      document.getElementById("section-experience-title").innerText = data.sections.experience[lang];
      document.getElementById("section-engagement-title").innerText = data.sections.engagement[lang];
      document.getElementById("section-video-title").innerText = data.sections.video[lang];

      // Fonction pour insérer des listes
      function populateList(id, items) {
        const ul = document.getElementById(id);
        ul.innerHTML = "";
        items.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
      }

      // Remplir les listes dynamiquement
      populateList("intro", data.intro[lang]);
      populateList("skills", data.skills[lang]);
      populateList("projects", data.projects[lang]);
      populateList("experience", data.experience[lang]);
      populateList("engagement", data.engagement[lang]);

      // Vidéo
      document.getElementById("video-frame").src = data.video[lang];
    });

  // Gestion du changement de langue
  document.querySelectorAll("#lang-switcher button").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-lang");
      const url = new URL(window.location);
      url.searchParams.set("lang", selected);
      window.location.href = url.toString();
    });
  });
});
