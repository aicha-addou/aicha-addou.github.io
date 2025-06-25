document.addEventListener("DOMContentLoaded", () => {
  const langParam = new URLSearchParams(window.location.search).get("lang");
  const defaultLang = navigator.language.slice(0, 2);
  const supported = ["fr", "en", "zh", "ar"];
  const lang = supported.includes(langParam) ? langParam :
               supported.includes(defaultLang) ? defaultLang : "fr";

  // Appliquer la langue et la direction d’écriture
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  // Messages pour la vidéo
  const videoNotes = {
    fr: "📺 Activez les sous-titres dans votre langue via l’icône ⚙️ de la vidéo.",
    en: "📺 Turn on subtitles in your language using the ⚙️ icon in the video.",
    zh: "📺 点击视频中的⚙️图标启用您的语言字幕。",
    ar: "📺 فعّل الترجمة بلغتك عبر أيقونة ⚙️ في الفيديو."
  };

  fetch("content.json")
    .then(res => res.json())
    .then(data => {
      // Titre principal
      document.getElementById("title").innerText = data.title[lang];
      document.getElementById("header").innerText = data.title[lang];

      // Titres de section
      document.getElementById("section-presentation-title").innerText = data.sections.presentation[lang];
      document.getElementById("section-skills-title").innerText = data.sections.skills[lang];
      document.getElementById("section-projects-title").innerText = data.sections.projects[lang];
      document.getElementById("section-experience-title").innerText = data.sections.experience[lang];
      document.getElementById("section-engagement-title").innerText = data.sections.engagement[lang];
      document.getElementById("section-video-title").innerText = data.sections.video[lang];

      // Remplir les listes dynamiquement
      function populateList(id, items) {
        const ul = document.getElementById(id);
        ul.innerHTML = "";
        items.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
      }

      if (data.intro && data.intro[lang]) populateList("intro", data.intro[lang]);
      if (data.skills && data.skills[lang]) populateList("skills", data.skills[lang]);
      if (data.projects && data.projects[lang]) populateList("projects", data.projects[lang]);
      if (data.experience && data.experience[lang]) populateList("experience", data.experience[lang]);
      if (data.engagement && data.engagement[lang]) populateList("engagement", data.engagement[lang]);

      // Met à jour la vidéo (src fixe, sous-titres dynamiques)



     const video = document.getElementById("video-player");
      if (video && video.textTracks) {
        // Important : attendre un peu que les pistes soient chargées
        setTimeout(() => {
          for (let i = 0; i < video.textTracks.length; i++) {
            const track = video.textTracks[i];
            track.mode = track.language === lang ? "showing" : "disabled";
          }
        }, 300);
      }
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
